"""Digital Eric - FastAPI entrypoint (FastAPI Cloud target)."""

import logging
import os
from collections.abc import AsyncIterator
from typing import Annotated, Literal

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.sse import EventSourceResponse
from pydantic import BaseModel, Field, StringConstraints, model_validator

from .notify import notify_conversation
from .prompt import HISTORY_CAP, build_contents, build_system_prompt
from .providers import GEMINI_MODEL, GROQ_MODEL, ProviderChain, sse_format
from .ratelimit import SlidingWindowLimiter

MAX_QUESTION_CHARS = 500
KNOWLEDGE_CHAR_CAP = 32_000  # ~8K tokens, the wayfinder stuffing budget

logger = logging.getLogger("digital-eric")

SSE_HEADERS = {
    "Cache-Control": "no-cache, no-transform",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no",
}


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4_000)

    @model_validator(mode="after")
    def _validate_turn(self) -> "ChatTurn":
        if self.role == "user" and len(self.content) > MAX_QUESTION_CHARS:
            raise ValueError(f"User turn exceeds {MAX_QUESTION_CHARS} characters")
        return self


class ChatRequest(BaseModel):
    message: Annotated[
        str,
        StringConstraints(strip_whitespace=True, min_length=1, max_length=MAX_QUESTION_CHARS),
    ]
    history: list[ChatTurn] = Field(default_factory=list, max_length=HISTORY_CAP)


def _get_client_ip(request: Request) -> str:
    peer = request.client.host if request.client else "unknown"
    trusted_proxies = {
        p.strip() for p in os.environ.get("TRUSTED_PROXIES", "").split(",") if p.strip()
    }
    trust_all = os.environ.get("TRUST_PROXY_HEADERS", "").lower() in ("true", "1", "yes")
    if trust_all or (trusted_proxies and peer in trusted_proxies):
        for h in ("cf-connecting-ip", "x-real-ip"):
            v = request.headers.get(h)
            if v:
                return v.strip()
    return peer



def _allowed_origins() -> list[str]:
    is_prod = os.environ.get("ENVIRONMENT", "").lower() in ("production", "prod")
    raw = os.environ.get("ALLOWED_ORIGINS")
    if not raw or not raw.strip():
        if is_prod:
            raise RuntimeError(
                "ALLOWED_ORIGINS environment variable must be set in production"
            )
        raw = "http://localhost:5173"
    return [o.strip().rstrip("/") for o in raw.split(",") if o.strip()]


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
    logger.info("Configured models: Gemini=%s, Groq=%s", GEMINI_MODEL, GROQ_MODEL)
    if len(system_prompt) > KNOWLEDGE_CHAR_CAP:
        logger.warning(
            "Knowledge File exceeds ~8K-token budget (%d chars); trim knowledge/digital-eric.md",
            len(system_prompt),
        )

    @app.get("/")
    async def root() -> dict[str, str]:
        return {"status": "ok", "service": "digital-eric-agent"}

    @app.get("/health")
    async def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.post("/chat")
    async def chat(req: ChatRequest, request: Request) -> StreamingResponse:
        client_ip = _get_client_ip(request)
        if not rate_limiter.allow(client_ip):
            return EventSourceResponse(
                iter([sse_format("You've hit the message limit for now - try again in a few minutes.")]),
                headers=SSE_HEADERS,
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

        return EventSourceResponse(generate(), headers=SSE_HEADERS)

    return app


app = create_app()
