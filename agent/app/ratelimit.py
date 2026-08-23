"""Naive in-memory sliding-window rate limiter.

v1 posture (guardrails ticket pending): per-instance, per-IP, small caps.
Good enough to stop a single curious visitor from burning the daily quota;
not a distributed solution.
"""

import time
from collections import defaultdict


class SlidingWindowLimiter:
    def __init__(self, max_requests: int, window_seconds: float) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: dict[str, list[float]] = defaultdict(list)

    def allow(self, key: str, now: float | None = None) -> bool:
        """Record a hit for key and say whether it is within the cap."""
        now = time.monotonic() if now is None else now
        hits = self._hits[key]
        cutoff = now - self.window_seconds
        while hits and hits[0] <= cutoff:
            hits.pop(0)
        if len(hits) >= self.max_requests:
            return False
        hits.append(now)
        return True
