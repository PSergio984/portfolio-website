# Digital Eric — What's Live & How to Operate It

The closing artifact of the AI-agent wayfinder map. This documents the system as it exists in production today, how to run it, and where it goes next. The full decision log lives on the [wayfinder map](https://github.com/PSergio984/portfolio-website/issues/1).

## What Digital Eric is

An ask-me-anything AI double of Eric Gabriel F. Manabat, embedded in his portfolio. Visitors click a floating **DE** orb, chat in first person with a visibly-disclosed AI, and get answers grounded in a curated Knowledge File — war stories, certifications, career goals, and hard boundaries included.

## Architecture (all $0/month)

```
Visitor browser
  └─ Vercel SPA (React 19 + Vite)  ── VITE_CHAT_API_URL
       └─ FastAPI on FastAPI Cloud (Hobby, scale-to-zero)   https://portfolio-website-1e1b9d48.fastapicloud.dev
            ├─ POST /chat → SSE token stream
            ├─ System prompt = persona framing + knowledge/digital-eric.md (stuffed whole, ~2K tokens)
            ├─ Gemini 3.6 Flash (free tier) ── on failure ──▶ Groq llama-3.1-8b-instant (if key set)
            ├─ Per-IP rate limit: 10 msgs / 5 min, in-memory
            └─ Telegram push per conversation (if keys set) = the abuse tripwire
```

- Frontend widget: `src/components/DigitalEricChat.tsx` (AI badge always visible, cold-start copy, starter chips, graceful offline/error copy)
- Backend: `agent/` (FastAPI; tests in `agent/tests/`, 12 passing)
- Brain: `knowledge/digital-eric.md` (canonical) mirrored to `agent/knowledge/` (CI test fails if they drift)

## Operating manual

| Task                                 | How                                                                                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Teach Digital Eric something new** | Edit `knowledge/digital-eric.md`, copy it to `agent/knowledge/digital-eric.md`, commit, push. Auto-deploys.                                        |
| **Change the model**                 | FastAPI Cloud env `GEMINI_MODEL` (default `gemini-3.6-flash` — Google retires names often; check AI Studio when answers 404)                       |
| **Deploy manually**                  | `cd agent && fastapi deploy` (normally automatic on push to `main`)                                                                                |
| **Read a conversation**              | Your Telegram chat (one push per exchange)                                                                                                         |
| **See errors**                       | FastAPI Cloud dashboard logs — provider failures log as `provider gemini failed: …`                                                                |
| **Frontend env**                     | Vercel: `VITE_CHAT_API_URL = https://portfolio-website-1e1b9d48.fastapicloud.dev` (no trailing slash needed)                                       |
| **Secrets**                          | FastAPI Cloud env (write-once): `GEMINI_API_KEY`, optional `GROQ_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. Changes apply on next deploy. |

## Known trade-offs (accepted, revisit if traffic grows)

- **Cold start**: first message after idle waits a few seconds (Hobby tier forces scale-to-zero). The widget says "waking Digital Eric up…"
- **In-memory rate limit**: resets on redeploy; one instance only. Fine at portfolio traffic.
- **Free-tier data**: Gemini free tier may train on prompts — the Knowledge File contains public info only, enforced by review.
- **Model churn**: Google retired 2.0/2.5 Flash for new users mid-project; expect to bump `GEMINI_MODEL` occasionally.

## Roadmap (from the map's runner-up concepts)

1. **Recruiter mode** — same widget, second system-prompt mode triggered by pasting a job description; maps Eric's skills/certs/projects onto it
2. **Quiz game** — "How well do you know Eric?" shareable mode
3. **Daily digest** — Resend email or Telegram summary of the day's conversations (research: `research/conversation-review-options.md` on branch `research/conversation-review-options`)
4. **Neon analytics** — queryable conversation log if Telegram push isn't enough
5. **Site content catch-up** — the static site still says less than Digital Eric knows (AI-engineering positioning, Flyrank internship, active programs); plus the tracked [Add Professional Experience section](https://github.com/PSergio984/portfolio-website/issues/11)

## The journey, compressed

Charted from a one-line idea → 10 decision tickets → every one resolved → the thing got built along the way. Decisions and their tickets are indexed on the [map](https://github.com/PSergio984/portfolio-website/issues/1).
