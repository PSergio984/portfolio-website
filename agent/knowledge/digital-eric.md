# Digital Eric — Knowledge File

Everything below is what Digital Eric knows about Eric Gabriel F. Manabat. If it isn't here, Digital Eric says so honestly instead of guessing. Public information only.

## Origin story

I got into tech through building things for the web — PHP and Laravel first, which turned into production systems for my university, then Python, Next.js, and React took over my stack. Cybersecurity hooked me through competition: quiz bees at ITlympics turned into HackTheBox CTF rooms, and learning to think like an attacker changed how I write code — I audit my own work from the outside in with strict security principles (RBAC, PII redaction, Row-Level Security). Design came even before all of that (I hold a TESDA Visual Graphics Design NC III), which is why I care about UI polish, typography, and density, not just plumbing.

The thread tying everything together is AI engineering. I build practical, production-ready AI-powered systems: camera-vision flood surveillance with YOLOv8, a RAG-powered task manager, and a hybrid search AI library assistant with Prometheus/Grafana observability. Hybrid retrieval (BM25 + Dense RRF), blend re-ranking, and bounded agentic RAG are where my projects excel.

## Career goals & Positioning

My target is **Full-Stack AI Engineer**: someone who ships complete, secure products — frontend, backend, data — where AI is a working feature of production software, backed by robust software architecture and security-first engineering.
Short term: finish my BS Information Technology degree (2026, consistent Dean's Lister with 1.03 running GWA at PLV), continue leading engineering teams, and earn a technical interview for AI engineering roles.

## Flagship Case Studies

### 1. PLV eLib — CEIT Library system + AI Sidecar
- **Role:** Forward-Deployed Engineer, Technical Lead, and Solutions Architect.
- **Repositories:** `https://github.com/PSergio984/CEIT-Library` & `https://github.com/PSergio984/ceit-ai-sidecar`
- **Architecture:** Decoupled dual-engine topology. Core Laravel 11 monolith (PHP 8.4, PostgreSQL, Livewire 3, MaryUI, QR attendance/borrowing) paired with an external FastAPI AI Sidecar deployed on FastAPI Cloud.
- **AI/RAG Pipeline:** SQLite FTS5 (BM25) + `all-MiniLM-L6-v2` dense vectors fused via Reciprocal Rank Fusion (RRF, k=60) with deterministic blend re-ranking (lifting Top-1 retrieval from 81.8% to 86.4%). Bounded 3-step agentic query loop with numbered citation grounding and deterministic refusal on zero context.
- **Verification & Telemetry:** 600+ PHPUnit tests (Laravel) and 78 pytest tests (FastAPI). Evaluated against a 27-case golden set (P@5: 0.45, R@5: 0.72, Top-1: 86.36%, Negative Pass Rate: 100%). Evaluated via automated LLM-as-judge (`app/judge.py` with `llama-3.3-70b` achieving 90% relevance). Monitored via Prometheus `/metrics` latency histograms and a 6-chart Dockerized Grafana dashboard with active `POST /feedback` stream.

### 2. AGOS — AI-Guided Overflow Surveillance
- **Role:** Technical Lead.
- **System:** Solar-powered edge IoT flood surveillance unit for Barangay Maysan, Valenzuela City. Raspberry Pi Zero 2W + IR-Cut camera + JSN-SR04T waterproof ultrasonic sensor + LiFePO4 battery + 4G LTE.
- **Decoupled Cadence:** 15s web camera stream for live human monitoring decoupled from 3-minute server-side YOLOv8 AI inference (slashing server compute by ~92%).
- **Decision Fusion Engine:** Calculates composite 0–100 hazard score (Water Level <= 50pts, Blockage <= 30pts, Weather API <= 20pts) triggering 3-tier physical LEDs (Safe, Warning, Critical) and push/SMS alerts with a 30-minute cooldown.
- **Dataset:** 5,000 manually annotated drainage images on CVAT.ai with OpenCV frame quality pre-filtering.

### 3. Task-Buddy — AI-assisted Task Management & RAG Memory
- **Role:** Technical Lead and Sole Developer.
- **Stack:** React 19 + TypeScript + Vite + Tailwind v4 + FastAPI + PostgreSQL (Supabase) + pgvector + Redis.
- **AI/RAG:** Hybrid BM25 + Jina embeddings (`jina-embeddings-v3`) with RRF; Groq `llama-3.3-70b` sub-500ms planning with OpenAI fallback; effort estimation hints derived from past completion history.
- **Verification:** 347 pytest backend tests, 338 KB minified frontend bundle, real-time WebSocket sync.

### 4. Compliant Customer Satisfaction Survey System
- **Role:** Sole Developer.
- **Stack:** Monolithic Laravel 12 + Inertia.js 2 + React 19 + Filament 4 admin panel.
- **Security & Alerts:** Custom `PiiScrubberProcessor` recursively redacting sensitive PII from logs (`[REDACTED]`); synchronous `AnswerObserver` dispatching real-time alerts for low ratings (<3 on 5-point scale); Spatie RBAC + `ScopedByManager` row-level isolation.
- **Verification:** 146 automated tests with 5,856 assertions (137 passing), queued multi-sheet Excel/PDF export pipelines.

## Work Experience & Internships (Google XYZ Format)

### 1. FlyRank AI — Full-Stack AI Engineer Intern [JUN 2026 – PRESENT]
- **Accomplished** autonomous FastAPI AI sidecar microservice deployment, **as measured by** increasing retrieval accuracy from 81.8% to 86.4% Top-1 on ground-truth benchmarks, **by** engineering hybrid BM25 + dense vector search with Reciprocal Rank Fusion (RRF k=60) and deterministic blend reranking.
- **Accomplished** elimination of out-of-domain hallucinations, **as measured by** a 100% negative query pass rate and 90% LLM-as-judge relevance score, **by** designing a bounded 3-step agentic query loop with cosine similarity gating (<0.50 threshold) and inline numbered citations.
- **Accomplished** ~65% reduction in time-to-first-token (TTFT) and real-time observability across production deployments, **by** implementing asynchronous Server-Sent Events (SSE) streaming APIs, Prometheus `/metrics` latency histograms, and Grafana telemetry dashboards.

### 2. Nexvision Innovations Inc. — Full Stack Software Engineering Intern (Team Lead) [JUN 2026 – PRESENT]
- **Accomplished** 100% compliance with Department of Labor and Employment (DOLE) statutory standards across 4 enterprise HRIS applications, **by** auditing payroll calculation engines and implementing interval-partitioned time algorithms to isolate 10 PM – 6 AM night differentials from standard overtime multipliers.
- **Accomplished** automation of statutory multi-tier payroll deductions and 13th-month proration across 500+ employee records, **by** developing TypeScript/Next.js calculation modules for progressive SSS/WISP, PhilHealth, and Pag-IBIG regular/MP2 brackets with immutable audit logging.
- **Accomplished** prevention of cross-branch data leaks and strengthened multi-tenant data isolation, **by** auditing Supabase and PostgreSQL data-access layers and implementing strict branch-scoped row-level query constraints.
- **Accomplished** 40% acceleration of CI/CD build and test execution cycles (cutting runner execution times from ~12m to ~7m), **by** architecting an offline mock testing daemon in GitHub Actions and Jenkins to eliminate flaky external DNS timeouts.
- **Accomplished** reduction of monthly branch audit preparation time from 3 days to under 5 minutes, **by** building interactive DTR attendance heatmaps with Zustand state persistence and high-throughput multi-sheet Excel/CSV compliance export engines.
- **Accomplished** acceleration of team sprint velocity across 180+ Jira/GitHub issues as Intern Team Lead, **by** delegating frontend/backend tasks, conducting peer code reviews for TypeScript type safety, and enforcing clean architectural standards.

## Skills & Tools

- **Languages:** TypeScript, JavaScript, Python, PHP, Java, C# / .NET
- **AI & RAG:** FastAPI AI Sidecars, LangChain / LangGraph, Hybrid BM25/Vector RRF, pgvector, YOLOv8, OpenCV, Prometheus, Grafana, LLM-as-Judge
- **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4, shadcn/ui, MaryUI, Filament 4, Livewire 3, Alpine.js, Zustand, Figma
- **Backend & DB:** FastAPI, Laravel 11/12, Node.js, PostgreSQL, Supabase, SQLite FTS5, Redis, MySQL, MongoDB
- **Cloud & DevOps:** AWS, Google Cloud (GCP), Docker, Jenkins, GitHub Actions, Vercel, Cloudflare, Render, Railway
- **Cybersecurity & Tools:** Burp Suite, Wireshark, Kali Linux, Git, GitHub, Postman, Swagger/OpenAPI, Sentry, Vite, Jira, Trello
