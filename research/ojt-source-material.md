# OJT Source Material Inventory — Reflections & Sample Works (#41)

Scope: locate raw material for an OJT **Reflections** section and an **NDA-safe Sample Works** write-up. Paths + one-line abstracts only — no document contents quoted (NDA §4.3).

## Verdict

**Reflections are agent-draftable.** The richest source is the daily DSU diary archive (64 dated entries spanning the full internship, 2026-07-01 → 2026-09-25), backed by weekly OJT progress reports, first-person learning-records, both evaluation forms, and the issue #14 distilled summary. Department/role framing is officially pinned by two documents. Sample Works can be drafted from already-published NDA-safe phrasing (resume, llms.txt, issue #14) plus abstracted repo artifacts.

## A. Daily DSU archive — richest source for reflections

| Path | Abstract | Feeds |
| --- | --- | --- |
| `C:\Users\admin\OneDrive\Documents\dsu\YYYY-MM-DD\eric_gabriel_f_manabat.txt` | 64 daily first-person stand-up diary entries (`What I did yesterday` format, per-project sections) covering the entire OJT window — **this is what issue #14 ingested** | Reflections (day-by-day learning arc), Sample Works narrative |
| `C:\Users\admin\OneDrive\Documents\dsu\Developer - Turnover Document - Eric Manabat.docx` / `.md` | Developer turnover/handoff doc summarizing owned work at internship end | Sample Works narrative, reflections |
| `C:\Users\admin\OneDrive\Documents\dsu\[TEMPLATE] Developer - Turnover Document.docx` | Blank turnover template | — |
| `C:\Users\admin\OneDrive\Documents\dsu-mg\` | Post-OJT Mashup-Garage DSUs (2026-10-20 → 10-23 only, okra repo) — **not** Nexvision material | Context only |

## B. OJT program documents — `D:\3-5 2ND SEM\OJT\`

| Path | Abstract | Feeds |
| --- | --- | --- |
| `Voluntary Internship Agreement - [Manabat, Eric Gabriel F.].pdf` | Signed internship agreement; officially states engagement terms (candidate for department/role framing) | Department/role framing |
| `BSIT-2026-Pre-Deployment-Requirements-Checklist.docx` (also in `pre-deployment\`) | PLV BSIT OJT program requirements checklist | Program/dept framing |
| `pre-deployment\` | Full pre-deployment packet: HTE info form (CEIT-OJTF-001), signed Internship Plan, endorsement letter, notarized MOU, waiver, COR, med cert, school recommendation, acceptance letter, ID, vicinity maps | Department/role framing, host-company naming |
| `deployment\CEIT-OJTF-002_Internship_Plan.docx` | Official internship plan naming assigned duties | Department/role framing, responsibilities |
| `deployment\MANABAT_ACCEPTANCE.png` + `img2026*.pdf` | Acceptance letter + scanned deployment docs | Role framing |
| `deployment\Weekly Reports\Week 4–16\CEIT-OJTF-004_OJT_Weekly_Progress_Report_*.docx/.pdf` | **13 weekly OJT progress reports** (docx + signed PDF) with per-weekday photo evidence | Reflections (weekly milestones), Sample Works timeline |
| `deployment\DTR Sample 2026.xlsx` | Daily-time-record template | — |
| `post-deploment\CEIT-OJTF-010-Supervisor_s-Evaluation-of-Student-Intern.pdf` | Supervisor's evaluation of Eric | Reflections (external assessment) |
| `post-deploment\CEIT-OJTF-011_Students_Evaluation_of_Internship.pdf`, `MANABAT_STUDENT_EVALUATION.pdf`, `MANABAT_INTERNSHIP_EVALUATION.pdf` | Eric's own internship-evaluation write-ups | Reflections (first-person appraisal) |
| `post-deploment\Developer Turnover- Eric Gabriel Manabat.pdf` | Signed turnover doc (PDF twin of the dsu\ .docx) | Sample Works narrative |
| `post-deploment\Official_DTR\` + `Official_DTR_Signed\` | Official daily time records, Jul–Sep 2026 (signed copies) | Dates/hours verification |
| `AiFluency\` | ~19 Anthropic Academy certificate PDFs, capstone write-ups, `NexVision DSU Writer Agent Design.pdf`, `NexVision_DSU_Writer_Agent_Build_Log.docx`, workflow-audit docx | Reflections (AI-tooling growth), skills evidence |
| `BE\` | Backend Essentials workshop series (W2–W7 PDFs/HTML), 3 capstone PDFs, `NexCRM_AI_Product_Recommendation.docx.pdf`, `NexVision_Reasoning_RAG_AI_Intern_Icebreaker_Instructions.pdf`, STYLE guides, `MANABAT_W8_Workshop_Output.pdf` | Reflections (structured training), skills |
| `GCI\` | Separate data-science course (Python/pandas lessons, HomeCredit competition) — tangential to Nexvision OJT | Context only |
| `certs\` | Certificate images/PDFs (Snowflake, AWS, Coursera, DataCamp, Boot.dev, workshops) | Skills evidence |
| `Manabat_Eric_Resume(*).pdf`, `Manabat_Curriculum_Vitae.pdf` | Resume versions incl. post-OJT update | Role framing |
| `plv docs\` | Empty | — |
| `2025-template_bullet.docx` | Report template | — |

Gap: weekly reports start at **Week 4** — Weeks 1–3 covered only by DSU txts (daily coverage starts Jul 1).

## C. Nexvision engineering repos — `D:\Nexvision\` (NDA-covered — abstract only)

| Path | Abstract | Feeds |
| --- | --- | --- |
| `NexHRIS-SaaS\` | Laravel 12 + Inertia HRIS SaaS codebase; `docs\` = architecture/handover/sprint-governance docs; `MISSION.md` = Eric's onboarding brief | Sample Works (abstracted) |
| `NexHRIS-SaaS\learning-records\0001-…onboarding-baseline.md`, `lessons\0001-….html` | First-person onboarding learning record | Reflections |
| `Premium-Outlets-v3\` | Next.js multi-tenant retail HRIS (the "POHRIS" of issue #14); docs/, handoff docs | Sample Works (abstracted) |
| `Premium-Outlets-v3\learning-records\0001–0008`, `lessons\0001–0003` | **8 first-person learning records**: architecture baseline, employee-create data-flow, mental models, naming/serialization rationale, filtering tradeoffs, route-handler decisions | Reflections (richest repo-side learning trail) |
| `ASDEC-HRMS\` | Next.js HRMS; `docs\` = RBAC restructure handoffs, manual test cases, payroll reviews, biometric setup | Sample Works (abstracted) |
| `katahira-hrms\` | Next.js HRMS; BIR compliance gap analysis | Sample Works (abstracted) |

## D. Repo-side narrative (this repository)

| Path | Abstract | Feeds |
| --- | --- | --- |
| `resume.md`, `resume.html`, `public\resume.pdf` | Nexvision entry with quantified bullets (DOLE-compliant engines, 500+ records, RLS, 180+ tickets, CI −40%) | Sample Works, role framing |
| `src\components\Experience.tsx` | Live site entry: `Full Stack Engineer (Lead Intern)`, Jul–Sep 2026, Marikina hybrid | Role framing (as-published) |
| `public\llms.txt`, `public\llms-full.txt` | Published NDA-safe Nexvision narrative | Sample Works phrasing baseline |
| `knowledge\digital-eric.md` + `agent\knowledge\digital-eric.md` | Digital Eric canonical knowledge file incl. Nexvision entry | Reflections tone, NDA-safe facts |
| `DIGITAL-ERIC.md` | Ops doc for the Digital Eric agent | Context |
| `REVIEWS.md` | Phase-1 multi-agent site review | Not OJT material |
| `CONTEXT.md` | Site glossary | — |
| `nda-extract.txt` (untracked, main-2 workspace) | NDA text extract — officially states recipient capacity **FULL STACK DEVELOPER INTERN** on the NexHRIS SaaS Project, effective 2026-08-03 | **Department/role framing (authoritative)** + confidentiality boundary |
| `rubric-extract.txt` (untracked, main-2 workspace) | OJT portfolio requirements: OJT Experience / Sample Works / Reflections sections; due 2026-12-03 | Requirements target |
| `D:\Github\portfolio-website\learning-records\` + `lessons\` (gitignored, local) | `0002-nexvision-payroll-and-audit-export.md` + `…defending-nexvision….html` (also 0001 resume inventory, 0003 positioning) | Reflections, Sample Works |
| `D:\Github\portfolio-website\OJT-Website-Portfolio-Guidelines.docx` (untracked, local) | Rubric source document | Requirements target |
| GitHub issue #14 resolution comment | Pre-distilled NDA-safe weekly-report summary (weeks 4–12): payroll engine, night-diff time-slicing, RLS, CI mock daemon, analytics, team-lead across 12 weeks | Sample Works + reflections skeleton |
| `D:\Github\okra` + `okra-worktrees` | MG-playbook practice repo; `.agents\skills\mashup-dsu` defines the DSU format used above | Provenance/context only |

## Coverage check

- **Reflections**: covered — 64 daily DSUs + 13 weekly reports + evaluations + learning-records.
- **Sample Works**: covered at NDA-safe abstraction level — issue #14 summary + resume + llms.txt phrasing; repo internals stay abstract.
- **Department/role framing**: authoritative — internship agreement + NDA capacity line + internship plan + acceptance letter.
- Raw DSU/weekly files are **not committed** to the repo (correct — NDA); the drafted sections must stay at resume-bullet abstraction.
