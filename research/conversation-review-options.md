# Research: visitor-conversation review options

Resolves wayfinder ticket ["Decide how Eric reviews visitor conversations"](https://github.com/PSergio984/portfolio-website/issues/8). Checked August 2026.

Constraint: FastAPI Cloud Hobby keeps platform logs **1 day**; budget strictly $0; app disk is ephemeral (no volumes product), so writing a JSON file to the container is not durable.

## Options compared

| Option | Effort | Limits (free tier) | Reliability for sporadic traffic |
|---|---|---|---|
| **Telegram bot push** — background task forwards each Q&A to Eric's private chat | Lowest (~30 lines, one bot token) | Bot API is free; no relevant quota at this scale | Excellent — messages persist in Telegram forever, instant abuse alerts on his phone |
| **Neon Postgres** — insert each Q&A row via psycopg | Low–medium | 100 CU-hrs/project/mo (≈0.25 CU running ~400 hrs), 0.5 GB storage, autosuspend 5 min but **wakes in ms and never disables the project** | Excellent — built for exactly this pattern. Queryable analytics later |
| **Resend email digest** — daily summary email | Low | 100 emails/day, 3,000/mo free; needs verified domain for good deliverability (`onboarding@resend.dev` works solo) | Good — but digest ≠ realtime abuse alerting |
| **Supabase free tier** | Low–medium | 500 MB DB, but **projects pause after ~1 week of inactivity** → manual dashboard revival | Poor fit: portfolio traffic IS sporadic |
| Plain JSON file on app disk | Trivial | — | Broken by design: instances replaced on scale-to-zero + every deploy |
| Platform logs alone | None | 1-day retention | Insufficient as the only mechanism |

Sources: https://neon.com/docs/introduction/plans , https://neon.com/docs/introduction/scale-to-zero , https://resend.com/docs/knowledge-base/account-quotas-and-limits , https://fastapicloud.com/docs/builds-and-deployments/how-it-works/

## Recommendation

**v1: Telegram push per conversation** (bot token in FastAPI Cloud secrets; fire-and-forget `httpx` post in a background task after each exchange; failures must never break the chat response).

**Upgrade path if he wants analytics**: add Neon (free) table alongside the Telegram push — the insert call slots into the same background task, and a weekly Resend digest can read from it later.
