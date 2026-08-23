"""Digital Eric - FastAPI entrypoint (FastAPI Cloud target)."""

import logging
import os
from collections.abc import AsyncIterator

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.sse import EventSourceResponse
from pydantic import BaseModel, Field

from .notify import notify_conversation
from .prompt import build_contents, build_system_prompt
from .providers import ProviderChain, sse_format
from .ratelimit import SlidingWindowLimiter

MAX_QUESTION_CHARS = 500
KNOWLEDGE_CHAR_CAP = 32_000  # ~8K tokens, the wayfinder stuffing budget

logger = logging.getLogger("digital-eric")


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=MAX_QUESTION_CHARS)
    history: list[dict[str, str]] = Field(default_factory=list)


def _allowed_origins() -> list[str]:
    raw = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173")
    return [o.strip() for o in raw.split(",") if o.strip()]


def create_app(
    limiter: SlidingWindowLimiter | None = None,
    provider: ProviderChain | None = None,
) -> FastAPI:
    app = FastAPI(title="digital-eric-agent")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_allowed_origins(),
        allow_methods=["POST", "GET"],
        allow_headers=["*"],
    )
    rate_limiter = limiter or SlidingWindowLimiter(max_requests=10, window_seconds=300)
    system_prompt = build_system_prompt()
    if len(system_prompt) > KNOWLEDGE_CHAR_CAP:
        logger.warning(
            "Knowledge File exceeds ~8K-token budget (%d chars); trim knowledge/digital-eric.md",
            len(system_prompt),
        )

    @app.get("/health")
    async def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.post("/chat")
    async def chat(req: ChatRequest, request: Request) -> StreamingResponse:
        client_ip = request.client.host if request.client else "unknown"
        if not rate_limiter.allow(client_ip):
            return EventSourceResponse(
                iter([sse_format("You've hit the message limit for now - try again in a few minutes.")])
            )

        contents = build_contents(req.history, req.message)
        chain = provider or ProviderChain(
            gemini_key=os.environ.get("GEMINI_API_KEY"),
            groq_key=os.environ.get("GROQ_API_KEY"),
        )

        async def generate() -> AsyncIterator[str]:
            tokens: list[str] = []
            try:
                async for token in chain.stream(system_prompt, contents):
                    tokens.append(token)
                    yield sse_format(token)
                yield sse_format("[DONE]")
            finally:
                await notify_conversation(req.message, "".join(tokens)[:400])

        return EventSourceResponse(generate())

    return app


app = create_app()
