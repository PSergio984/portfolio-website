import json

from fastapi.testclient import TestClient

from agent.app.main import create_app
from agent.app.ratelimit import SlidingWindowLimiter


class FakeProvider:
    def __init__(self, tokens=None, fail_primary=False):
        self.tokens = tokens or ["Hello", " world"]
        self.fail_primary = fail_primary

    async def stream(self, system_prompt, contents):
        if self.fail_primary:
            raise RuntimeError("primary down")
        for t in self.tokens:
            yield t


def parse_sse(text):
    events = [line[6:] for line in text.split("\n") if line.startswith("data: ")]
    return [json.loads(e) for e in events]


def client(provider=None, max_requests=10, notify_spy=None):
    app = create_app(
        limiter=SlidingWindowLimiter(max_requests=max_requests, window_seconds=300),
        provider=provider,
    )
    if notify_spy is not None:
        import agent.app.main as main_mod

        main_mod.notify_conversation = notify_spy
    return TestClient(app)


def test_health():
    with client() as c:
        assert c.get("/health").json() == {"status": "ok"}


def test_chat_streams_tokens_then_done():
    with client(provider=FakeProvider(["Hi", " there"])) as c:
        with c.stream("POST", "/chat", json={"message": "hi"}) as resp:
            body = "".join(chunk for chunk in resp.iter_text())
    events = parse_sse(body)
    assert [e["token"] for e in events[:2]] == ["Hi", " there"]
    assert events[-1]["token"] == "[DONE]"


def test_chat_rejects_overlong_question():
    with client() as c:
        resp = c.post("/chat", json={"message": "x" * 501})
        assert resp.status_code == 422


def test_rate_limited_visitor_gets_polite_limit_message():
    with client(provider=FakeProvider(), max_requests=1) as c:
        first = c.post("/chat", json={"message": "hi"})
        assert first.status_code == 200
        with c.stream("POST", "/chat", json={"message": "again"}) as resp:
            body = "".join(chunk for chunk in resp.iter_text())
    assert "limit" in parse_sse(body)[0]["token"].lower()


def test_notify_called_after_stream():
    captured = {}

    async def spy(question, answer_head):
        captured["q"] = question
        captured["a"] = answer_head

    with client(provider=FakeProvider(["Answer"]), notify_spy=spy) as c:
        with c.stream("POST", "/chat", json={"message": "who are you?"}) as resp:
            "".join(chunk for chunk in resp.iter_text())
    assert captured["q"] == "who are you?"
    assert captured["a"].startswith("Answer")


def test_root():
    with client() as c:
        assert c.get("/").json() == {"status": "ok", "service": "digital-eric-agent"}


def test_allowed_origins_normalization(monkeypatch):
    from agent.app.main import _allowed_origins

    monkeypatch.setenv(
        "ALLOWED_ORIGINS",
        "https://ericmanabat-dev.vercel.app/, https://ericmanabat.is-a.dev/, http://localhost:5173",
    )
    assert _allowed_origins() == [
        "https://ericmanabat-dev.vercel.app",
        "https://ericmanabat.is-a.dev",
        "http://localhost:5173",
    ]


def test_provider_model_defaults():
    import os
    from agent.app.providers import GEMINI_MODEL, GROQ_MODEL

    if "GEMINI_MODEL" not in os.environ:
        assert GEMINI_MODEL == "gemini-3.8-flash"
    if "GROQ_MODEL" not in os.environ:
        assert GROQ_MODEL == "llama-3.3-70b-versatile"


def test_malformed_history_returns_422_not_500():
    with client(provider=FakeProvider()) as c:
        resp = c.post("/chat", json={"message": "hello", "history": [{"bad": "data"}]})
        assert resp.status_code == 422
        resp2 = c.post("/chat", json={"message": "hello", "history": [{"role": "user"}]})
        assert resp2.status_code == 422


def test_whitespace_only_message_returns_422():
    with client(provider=FakeProvider()) as c:
        resp = c.post("/chat", json={"message": "    "})
        assert resp.status_code == 422


def test_sse_headers_disable_proxy_buffering():
    with client(provider=FakeProvider()) as c:
        with c.stream("POST", "/chat", json={"message": "hi"}) as resp:
            assert resp.headers.get("x-accel-buffering") == "no"
            assert "no-cache" in resp.headers.get("cache-control", "")
            assert "no-transform" in resp.headers.get("cache-control", "")


def test_cf_connecting_ip_used_for_rate_limiting():
    with client(provider=FakeProvider(), max_requests=1) as c:
        # First request from IP A succeeds
        resp1 = c.post("/chat", json={"message": "hi"}, headers={"cf-connecting-ip": "198.51.100.1"})
        assert resp1.status_code == 200
        # Second request from IP A is limited
        with c.stream("POST", "/chat", json={"message": "hi again"}, headers={"cf-connecting-ip": "198.51.100.1"}) as resp2:
            body = "".join(chunk for chunk in resp2.iter_text())
        assert "limit" in parse_sse(body)[0]["token"].lower()
        # Request from IP B succeeds despite same host
        resp3 = c.post("/chat", json={"message": "new visitor"}, headers={"cf-connecting-ip": "198.51.100.2"})
        assert resp3.status_code == 200


def test_strict_cors_in_production(monkeypatch):
    import pytest
    from agent.app.main import create_app

    monkeypatch.setenv("ENVIRONMENT", "production")
    monkeypatch.delenv("ALLOWED_ORIGINS", raising=False)
    with pytest.raises(RuntimeError, match="ALLOWED_ORIGINS environment variable must be set in production"):
        create_app()


def test_safety_filter_returns_in_character_refusal():
    from agent.app.providers import SAFETY_REFUSAL, ProviderChain

    async def throwing_streamer(system_prompt, contents, key):
        raise RuntimeError("Blocked by safety policy: HARM_CATEGORY_DANGEROUS_CONTENT")
        yield "never"

    chain = ProviderChain(gemini_key=None, groq_key=None)
    chain.steps = [("gemini", throwing_streamer, "dummy-key")]

    with client(provider=chain) as c:
        with c.stream("POST", "/chat", json={"message": "generate exploit payload"}) as resp:
            body = "".join(chunk for chunk in resp.iter_text())
        tokens = parse_sse(body)
        assert tokens[0]["token"] == SAFETY_REFUSAL



