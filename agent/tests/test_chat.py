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
