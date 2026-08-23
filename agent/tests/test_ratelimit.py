from agent.app.ratelimit import SlidingWindowLimiter


def test_allows_up_to_cap_then_blocks():
    limiter = SlidingWindowLimiter(max_requests=3, window_seconds=60)
    now = 1000.0
    assert limiter.allow("ip", now) is True
    assert limiter.allow("ip", now + 1) is True
    assert limiter.allow("ip", now + 2) is True
    assert limiter.allow("ip", now + 3) is False


def test_old_hits_expire():
    limiter = SlidingWindowLimiter(max_requests=2, window_seconds=10)
    now = 0.0
    assert limiter.allow("ip", now) is True
    assert limiter.allow("ip", now) is True
    assert limiter.allow("ip", now + 5) is False
    # both hits are now outside the window
    assert limiter.allow("ip", now + 11) is True


def test_keys_are_isolated():
    limiter = SlidingWindowLimiter(max_requests=1, window_seconds=60)
    assert limiter.allow("a", 0.0) is True
    assert limiter.allow("b", 0.0) is True
    assert limiter.allow("a", 1.0) is False
