# Portfolio Website

Personal portfolio of Eric Gabriel F. Manabat — a cybersecurity-flavored developer portfolio that is gaining an AI layer so visitors can get to know Eric conversationally.

## Language

**Digital Eric**:
The AI agent on the portfolio site that answers visitor questions about Eric in Eric's first-person voice, always visibly disclosed as AI.
_Avoid_: chatbot, AI assistant, bot

**Knowledge File**:
The curated document containing everything Digital Eric is allowed to know about Eric; it defines the agent's boundaries as much as its facts.
_Avoid_: brain, database, context window, training data

**Where-it-breaks list**:
The honest ledger of hardening checks — empty/garbage submit, double-submit, untested browser/device, click every demo/repo/link — with input, trigger, expected vs actual, and triage.
_Avoid_: bug list, QA report

**Fix-now**:
A finding that blocks launch and must be fixed before the Hardening Review passes (broken demo 404, hash lost, OG missing, mailto typo, rate-limit bypass, overflow <375px).
_Avoid_: must-fix, blocker

**Known limitation**:
An honest, named, deferred gap that does not block launch (no backend contact form by design, Hobby cold-start delay, no markdown in chat) with reason, impact, and next-effort pointer.
_Avoid_: wontfix, known issue

**Hardening Review**:
Checkpoint 2 peer review that judges the Where-it-breaks list plus fix-now evidence, SEO/share preview, and speed artefacts; pass means zero open fix-nows and reviewer sign-off.
_Avoid_: code review, QA sign-off
