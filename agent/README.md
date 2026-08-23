# Digital Eric — agent backend

FastAPI service powering the portfolio chatbot. Deploys to FastAPI Cloud (Hobby, free).

## Local development

```powershell
python -m venv .venv
.venv\Scripts\pip install -e . pytest
.venv\Scripts\python -m pytest tests -q     # from repo root
uv run fastapi dev                          # or: .venv\Scripts\fastapi dev
```

## Deploy (from this `agent/` directory)

```powershell
uv tool install fastapi-cloud-cli   # one-time CLI install
fastapi login                       # one-time browser auth
fastapi deploy                      # packages THIS folder only
```

The Knowledge File is vendored at `agent/knowledge/digital-eric.md`. After editing the
canonical `knowledge/digital-eric.md` at repo root, re-copy it here before deploying —
CI fails if the two drift.

## Secrets (once, via CLI or dashboard)

```
fastapi cloud env set --secret GEMINI_API_KEY <key>      # aistudio.google.com
fastapi cloud env set GROQ_API_KEY <key>                 # optional fallback
fastapi cloud env set TELEGRAM_BOT_TOKEN <token>         # optional conversation push
fastapi cloud env set TELEGRAM_CHAT_ID <chat_id>
```

Then point the frontend at the app: Vercel env `VITE_CHAT_API_URL = https://<app>.fastapicloud.dev`.
