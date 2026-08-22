# Research: FastAPI Cloud + Gemini integration mechanics

Resolves wayfinder ticket ["Verify FastAPI Cloud + Gemini integration mechanics"](https://github.com/PSergio984/portfolio-website/issues/3). Checked August 2026.

## Verified facts

### FastAPI Cloud (Hobby, free beta)

| Fact | Detail | Source |
|---|---|---|
| Scale-to-zero | Enabled by default; Hobby cannot disable. First request after idle waits seconds | https://fastapicloud.com/docs/builds-and-deployments/how-it-works/ |
| Disk is ephemeral | Instances replaced gradually on every deploy; no volumes/persistent-storage product exists. Apps must be stateless | same + https://fastapicloud.com/docs/builds-and-deployments/database-migrations/ |
| Deploy from Windows | CLI-first: `uv run fastapi deploy` packages code (respects `.gitignore`, overridable by `.fastapicloudignore`), builds in cloud, zero downtime. Creates `.fastapicloud/` link dir | https://fastapicloud.com/docs/fastapi-cloud-cli/deploy/ |
| Secrets | Dashboard or `fastapi cloud env set --secret NAME`; encrypted, write-once, apply on NEXT deploy | https://fastapicloud.com/docs/builds-and-deployments/environment-variables/ |
| CI option | `fastapi cloud setup-ci` generates a GitHub Actions workflow + deploy tokens; or GitHub-app auto-deploy on push | https://fastapicloud.com/blog/fastapi-cloud-public-beta/ |

### Streaming (SSE)

- Modern FastAPI has **native SSE**: `response_class=EventSourceResponse` + `yield` (async generator). No sse-starlette dependency needed. Works over POST too.
- It sends an automatic **`: ping` keep-alive comment every 15 s when idle**, and sets `Cache-Control: no-cache` + `X-Accel-Buffering: no` automatically — this neutralizes the classic proxy-buffering/idle-timeout failure mode. No FastAPI-Cloud-specific stream timeout is documented; the 15 s pings cover idle gaps and LLM token streams flow continuously once started.
- Sources: https://fastapi.tiangolo.com/tutorial/server-sent-events/ , https://fastapi.tiangolo.com/reference/sse/
- Cold-start latency (seconds) happens *before* the request reaches the app — SSE can't mask it; frontend loading copy handles it (UX ticket).

### Gemini API (free tier)

- SDK: `google-genai` (`pip install google-genai`, `from google import genai`). Async client; streaming: iterate chunks from `client.models.generate_content_stream(...)` (or await the async variant). Per-request `safety_settings=[SafetySetting(category=..., threshold=...)]`.
- Free tier covers Flash/Flash-Lite only; reported limits ~10–15 RPM, ~250K TPM, ~1,000–1,500 requests/day per project (Google no longer publishes static tables — verify live values in AI Studio). Resets midnight Pacific.
- **Data caveat: free-tier prompts/responses may be used to train Google products.** Keep the system prompt to public portfolio content only.
- Sources: https://ai.google.dev/gemini-api/docs/rate-limits , https://ai.google.dev/gemini-api/docs/billing

### Groq fallback

- OpenAI-compatible: `base_url="https://api.groq.com/openai/v1"` with any OpenAI SDK client; free tier ~30 RPM, e.g. `llama-3.1-8b-instant` ~14,400 req/day, `openai/gpt-oss-120b` ~1,000 req/day (per model, UTC reset). A 429-fallback is a try/except swapping client+model. Source: https://console.groq.com/docs/rate-limits

## Recommended integration pattern

```
Vercel SPA ──POST /chat (SSE)──▶ FastAPI app on FastAPI Cloud
                                   ├─ CORS middleware: allow-list Vercel origin(s)
                                   ├─ rate-limit check (guardrails ticket)
                                   ├─ build messages: [system: knowledge file] + history + question
                                   ├─ Gemini Flash stream ──429──▶ Groq client swap
                                   └─ log Q&A (conversation-review decision)
```

Env vars: `GEMINI_API_KEY` (secret), `GROQ_API_KEY` (optional secret), `ALLOWED_ORIGINS`. Stateless app — no disk writes ever. Optional anti-cold-start: scheduled `/health` ping via GitHub Actions cron (tradeoff: keeps a replica warm vs. accepting seconds of lag; decide during guardrails/spec).
