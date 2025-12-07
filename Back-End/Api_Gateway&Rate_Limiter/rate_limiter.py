import asyncio
import time
from typing import Dict

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        # capacity: max tokens
        # refill_rate: tokens / second
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate
        self.last = time.monotonic()

    def allow(self, tokens: int = 1) -> bool:
        now = time.monotonic()
        elapsed = now - self.last
        self.last = now
        # refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True
        return False


class RateLimiter:
    """Simple in-memory per-key token bucket limiter.

    - Not intended for distributed/production use; replace with Redis or other store for multi-process setups.
    - Key is typically client IP or API key.
    """

    def __init__(self, capacity: int = 10, refill_rate: float = 1.0):
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.buckets: Dict[str, TokenBucket] = {}
        self.locks: Dict[str, asyncio.Lock] = {}

    async def allow_request(self, key: str, tokens: int = 1) -> bool:
        # Ensure single coroutine creates bucket for key
        lock = self.locks.get(key)
        if lock is None:
            lock = asyncio.Lock()
            self.locks[key] = lock

        async with lock:
            bucket = self.buckets.get(key)
            if bucket is None:
                bucket = TokenBucket(capacity=self.capacity, refill_rate=self.refill_rate)
                self.buckets[key] = bucket
            return bucket.allow(tokens)
