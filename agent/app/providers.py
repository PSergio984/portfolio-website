"""LLM providers: Gemini primary, Groq fallback (wayfinder research decision).

Fallback semantics: a provider that fails BEFORE emitting any token is skipped
silently in favor of the next one; a provider that dies MID-STREAM keeps its
partial answer and appends a clean cut-off notice instead of splicing in
another model's continuation.
"""

import json
import logging
import os
from collections.abc import AsyncIterator

import httpx

logger = logging.getLogger("digital-eric")

GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.1-8b-instant")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

CUT_OFF_NOTICE = " …(my connection dropped mid-answer — ask again and I'll continue)"


async def stream_gemini(
    system_prompt: str, contents: list[dict], api_key: str
) -> AsyncIterator[str]:
    import inspect

    from google import genai
    from google.genai import types as gtypes

    client = genai.Client(api_key=api_key)
    config = gtypes.GenerateContentConfig(system_instruction=system_prompt)
    result = client.aio.models.generate_content_stream(
        model=GEMINI_MODEL, contents=contents, config=config  # type: ignore[arg-type]
    )
    if inspect.iscoroutine(result):
        # newer google-genai versions: await to obtain the async iterator
        result = await result
    async for chunk in result:
        text = chunk.text or ""
        if text:
            yield text


async def stream_groq(
    system_prompt: str, contents: list[dict], api_key: str
) -> AsyncIterator[str]:
    messages = [{"role": "system", "content": system_prompt}]
    messages += [{"role": c["role"], "content": c["parts"][0]["text"]} for c in contents]
    payload = {"model": GROQ_MODEL, "messages": messages, "stream": True}
    headers = {"Authorization": f"Bearer {api_key}"}
    async with httpx.AsyncClient(timeout=60) as http:
        async with http.stream("POST", GROQ_URL, json=payload, headers=headers) as resp:
            resp.raise_for_status()
            async for line in resp.aiter_lines():
                if not line.startswith("data: "):
                    continue
                data = line[6:]
                if data == "[DONE]":
                    return
                delta = json.loads(data)["choices"][0]["delta"].get("content")
                if delta:
                    yield delta


class ProviderChain:
    """Yields tokens from the first provider that works; falls back on failure."""

    def __init__(self, gemini_key: str | None, groq_key: str | None) -> None:
        self.steps: list[tuple[str, object, str]] = []
        if gemini_key:
            self.steps.append(("gemini", stream_gemini, gemini_key))
        if groq_key:
            self.steps.append(("groq", stream_groq, groq_key))

    async def stream(
        self, system_prompt: str, contents: list[dict]
    ) -> AsyncIterator[str]:
        if not self.steps:
            yield "Digital Eric is still being configured - no LLM keys are set yet."
            return
        for _name, streamer, key in self.steps:
            emitted = False
            try:
                async for token in streamer(system_prompt, contents, key):  # type: ignore[operator]
                    emitted = True
                    yield token
                return
            except Exception as exc:  # noqa: BLE001 - fallback is the whole point
                logger.warning("provider %s failed: %s: %s", name, type(exc).__name__, exc)
                if emitted:
                    # Mid-stream failure: keep the partial answer, stop cleanly.
                    yield CUT_OFF_NOTICE
                    return
                continue
        yield (
            "Eric's AI providers are unreachable right now - please try again shortly."
        )


def sse_format(data: str) -> str:
    return f"data: {json.dumps({'token': data})}\n\n"
