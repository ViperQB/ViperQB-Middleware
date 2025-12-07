# ViperQB API (simulated middleware)

This is an Express-based API for the `ViperQB` smart-contract commands listed in `ViperQB_Commands.md`.

Usage

1. Install dependencies:

```powershell
cd "ViperQB API"; npm install
```

2. Set environment variables (see `.env`) or set them in your shell.

3. Start the server:

```powershell
cd "ViperQB API"; npm start
```

Endpoints

- `GET /api/commands` — list available commands
- `POST /api/call/:command` — simulate a transactional call (body JSON contains parameters)
- `GET /api/query/:command?param=value` — simulate a read-only query (use query string)

Example request (TransferToken):

```powershell
curl -X POST http://localhost:3000/api/call/TransferToken -H "Content-Type: application/json" -d '{"assetName":"11824728374629182","recipient":"RECIPIENT_ADDRESS","amount":1000000}'
```

The API will return a JSON object with a `qubicCli` field showing a simulated `qubic-cli` command that would run the operation using environment-controlled addresses and credentials.
