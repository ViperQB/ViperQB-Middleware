import asyncio
from fastapi import FastAPI, Request, Response, HTTPException, status
from fastapi.responses import StreamingResponse
import httpx
from rate_limiter import RateLimiter

app = FastAPI(title="ViperQb API Gateway")

# Configure a simple per-IP rate limiter: capacity 20 tokens, refill 5 tokens/sec
limiter = RateLimiter(capacity=20, refill_rate=5.0)


def map_to_backend(path: str) -> str:
    """Simple routing rules. Update this mapping to forward to real services.

    - Requests beginning with `service1/` -> http://localhost:8001/
    - Requests beginning with `service2/` -> http://localhost:8002/
    - Otherwise -> http://localhost:8001/
    """
    if path.startswith("service1/") or path == "service1":
        return "http://127.0.0.1:8001/"
    if path.startswith("service2/") or path == "service2":
        return "http://127.0.0.1:8002/"
    return "http://127.0.0.1:8001/"


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Use client host as key
    client = request.client.host if request.client else "unknown"
    allowed = await limiter.allow_request(client)
    if not allowed:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many requests")
    return await call_next(request)


@app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"])
async def proxy(full_path: str, request: Request):
    backend_base = map_to_backend(full_path)
    # Build destination URL
    # Preserve the path after the service prefix
    dest = backend_base + full_path

    # Prepare client request data
    method = request.method
    headers = dict(request.headers)
    # Remove host header to allow httpx to set correct host
    headers.pop("host", None)

    params = dict(request.query_params)
    content = await request.body()

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.request(method, dest, headers=headers, params=params, content=content)
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail=f"Upstream request failed: {exc}")

    # Build response streaming back to client
    return Response(content=resp.content, status_code=resp.status_code, headers=dict(resp.headers))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
