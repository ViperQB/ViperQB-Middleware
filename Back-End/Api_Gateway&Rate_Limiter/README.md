# API Gateway & Rate Limiter

This folder contains a small FastAPI-based API Gateway with an in-memory rate limiter and a mock backend service for testing.

Features
- FastAPI gateway (`main.py`) that proxies incoming requests to backend services.
- Simple per-IP token-bucket in-memory rate limiter (`rate_limiter.py`).
- Mock backend service (`mock_service.py`) listening on port `8001` for quick testing.
- `requirements.txt` with dependencies to install.

Notes and warnings
- The in-memory rate limiter is suitable for local development and single-process deployments only. For production or multi-process environments, replace the storage with a distributed store (Redis, Memcached) and use a robust middleware.

Quickstart (PowerShell)

1) Create a virtual environment and install dependencies

```powershell
cd Api_Gateway&Rate_Limiter
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2) Start the mock backend service (port 8001)

```powershell
# In terminal A
cd Api_Gateway&Rate_Limiter
.\.venv\Scripts\Activate.ps1
python mock_service.py
```

3) Start the gateway (port 8080)

```powershell
# In terminal B
cd Api_Gateway&Rate_Limiter
.\.venv\Scripts\Activate.ps1
python main.py
```

4) Test the proxy and rate limiter

```powershell
# GET through gateway to service1 path
curl http://127.0.0.1:8080/service1/hello

# POST through gateway
curl -X POST http://127.0.0.1:8080/service1/echo -d '{"hello":"world"}' -H 'Content-Type: application/json'
```

Configuration
- Adjust rate limits in `main.py` where `RateLimiter` is instantiated.
- Update routing logic in `map_to_backend` to forward to your actual services or service discovery.

Extending for production
- Use Redis or another centralized store for token buckets (or use Redis' INCR/EXPIRE pattern).
- Add authentication and API key handling (use API key as rate limit key if applicable).
- Add logging, metrics (Prometheus), and health checks.

Next steps I can do for you
- Replace the in-memory limiter with a Redis-backed limiter and provide docker-compose.
- Add API key-based rate limiting and a simple admin endpoint to view rate usage.

PowerShell launch scripts
- `start_mock.ps1`: Creates a virtual environment (if missing), installs packages, and opens a new PowerShell window that runs the mock backend on port `8001`.
- `start_gateway.ps1`: Creates a virtual environment (if missing), installs packages, and opens a new PowerShell window that runs the API gateway on port `8080`.
- `start_all.ps1`: Convenience script that starts both the mock backend and the gateway in separate windows.

Usage
```powershell
cd Api_Gateway&Rate_Limiter
.\start_all.ps1
```

Or start individually:
```powershell
.\\start_mock.ps1
.\\start_gateway.ps1
```