from fastapi import FastAPI, Request

app = FastAPI(title="ViperQb Mock Service")


@app.get("/{path:path}")
async def echo_get(path: str, request: Request):
    return {
        "service": "mock",
        "path": path,
        "method": "GET",
        "query": dict(request.query_params),
    }


@app.post("/{path:path}")
async def echo_post(path: str, request: Request):
    body = await request.body()
    try:
        # attempt to decode
        data = body.decode("utf-8")
    except Exception:
        data = str(body)
    return {
        "service": "mock",
        "path": path,
        "method": "POST",
        "body": data,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("mock_service:app", host="127.0.0.1", port=8001, reload=True)
