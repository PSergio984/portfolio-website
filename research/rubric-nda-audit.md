# Rubric Gap Audit + NDA Privacy Audit

Resolves [#40](https://github.com/PSergio984/portfolio-website/issues/40), part of wayfinder map [#39](https://github.com/PSergio984/portfolio-website/issues/39).

- **Primary sources:** `rubric-extract.txt` (OJT grading rubric, 5 criteria / 100 pts), `nda-extract.txt` (signed Nexvision NDA; §2 CI definition, §4.3 portfolio ban, §10.3 academic submissions, §12.2 no retained copies).
- **Surfaces audited:** `index.html`, `src/components/*.tsx`, `src/data/*.ts`, `public/llms.txt`, `public/llms-full.txt`, `public/sitemap.xml`, `public/robots.txt`, `resume.md`, `resume.html`, `public/resume.pdf` (existence only, not parsed), `knowledge/digital-eric.md`, `agent/knowledge/digital-eric.md` (byte-identical mirror of `knowledge/` — CI fails if they drift, per `DIGITAL-ERIC.md`), `DIGITAL-ERIC.md`, `CONTEXT.md`, `public/assets/**`, `scripts/generate-og-image.mjs`, git history.
- **Live spot-check:** `https://ericmanabat-dev.vercel.app/llms.txt` fetched and confirmed byte-equivalent to repo `public/llms.txt` (Nexvision line included). Homepage is a client-rendered Vite SPA (`<div id="root">` only over the wire), so rendered-DOM checks rely on the repo source at `main-2` @ `f721694`.
- **Eric's standing rulings applied:** no company name on submission-facing surfaces; generalized tech/metrics may stay; no product link, no screenshots (verbal supervisor guidance); no written-approval request.

---

## Audit A — Rubric gap audit

Required content elements (`rubric-extract.txt:4-16`), verdict + evidence:

| Required element | Status | Evidence (file:line) | Gap |
|---|---|---|---|
| Home page / professional introduction | **PRESENT** | `src/components/Hero.tsx:72-116` (name, "Full-Stack AI Engineer" badge, tagline); `index.html:7-11` (title/description) | — |
| ↳ professional skills & competencies | **PRESENT** | `Hero.tsx:47-66` (3 "what I do" cards); `src/components/Skills.tsx:74-214` (6 groups, ~50 skills) | — |
| ↳ career objectives | **PARTIAL** | Implicit only: `Hero.tsx:89-92` "Available for Roles" badge; `src/components/Contact.tsx:21-23` "open for Full-Stack & AI Engineering roles"; `public/llms-full.txt:11-12` target role (llms file, not site UI) | No explicit career-objectives statement on the rendered site |
| ↳ work experiences | **PRESENT** | `src/components/Experience.tsx:26-94` (2 entries) | — |
| ↳ downloadable resume | **PRESENT** | `Contact.tsx:35-47` "View Resume" → `src/components/ResumeModal.tsx:75-76,121-122` (`download="Eric_Manabat_Resume.pdf"`); `public/resume.pdf` exists (146 KB); `public/llms.txt:15` links it | — |
| Digital calling card / contact info | **PRESENT** | `Contact.tsx:26-78` (email, GitHub, Boot.dev, LinkedIn); `Hero.tsx:8-45` (6 platform links incl. TryHackMe/HTB/HackerRank); `index.html:88-93` schema email/sameAs | — |
| OJT Experience (dept, roles, technologies, skills developed) | **PARTIAL** | `Experience.tsx:26-52` — role `Full Stack Engineer (Lead Intern)`, dates `[JUL – SEPT 2026]`, location, summary, 6 XYZ bullets, 8 tech tags | No department named; no explicit "skills & competencies developed" line; no general company background (rubric allows it *when authorized* — it is not); employer currently named → violates NDA §4.3/§10.3, see Audit B |
| Sample Works on OJT (may be video demo reel) | **MISSING** | Nexvision entry has no `proofs`/artifacts (`Experience.tsx:44-52`); no OJT demo media in `public/assets/**` | Needs NDA-safe substitute: generalized written artifacts or mock-data demo (real screenshots/code forbidden by NDA §2/§12.2 and supervisor ruling) |
| Reflections | **MISSING** | No component/section; site order is Hero→Projects→Experience→Skills→Credentials→Contact (`src/App.tsx:20-30`). Per-project `lessons` arrays exist in `src/data/caseStudies.ts` but cover personal projects, not the OJT | Needs an OJT Reflections section (learning, contribution vs. team, NDA-compliant) |
| Personal Projects portfolio | **PRESENT** | `src/components/Projects.tsx:51-206` + `src/data/caseStudies.ts` (4 case studies: PLV eLib, AGOS, Task-Buddy, Survey System) | — |
| Certification, Achievements and Training | **PRESENT** | `src/components/Credentials.tsx` + `src/data/credentials.ts` (~46 entries, categories: awards/certifications/programs/seminars) | — |

**Score: 5 present, 2 partial (career objectives thin; OJT Experience lacking dept/skills-developed wording), 2 missing (Sample Works, Reflections).**

### Design & technical requirements spot-check (`rubric-extract.txt:18-31`)

- Responsive structure: responsive Tailwind classes throughout (`sm:`/`md:`/`lg:`); logical single-column section order, no duplication.
- Broken/placeholder sweep: no `lorem`/`TODO`/`FIXME`/"coming soon" in `src/`, `index.html`, `public/llms*.txt`, `resume.*` (grep, zero hits); `tests/seo.test.ts:222-243` asserts the same for llms files.
- Referenced assets exist: `public/assets/**` contains all `imageUrl` targets (project webps, cert images, cohort proofs); `public/resume.pdf`, `og-image.png`, `profile.png` all present (`tests/seo.test.ts:245-254` asserts).
- Navigation: `Header.tsx:5-12` anchor ids all resolve to rendered sections (`App.tsx:20-30`).
- Minor inconsistency (not graded-blocking): `resume.md:5` / `resume.html:199` cite `ericmanabat.is-a.dev` while canonical is `ericmanabat-dev.vercel.app`.

---

## Audit B — NDA privacy audit

CI definitions applied: NDA §2 (payroll/statutory logic, BIR/SSS/PhilHealth/Pag-IBIG mapping, Alphalist/Payroll Trust Engine logic, sprint plans, internal metrics, screenshots/comms), §4.3/§10.3 (no CI in portfolios/academic submissions), §12.2 (no retained copies/screenshots/sample code).

**Canonical generalized phrase (adopt everywhere):** `A Philippine HR-tech SaaS company`

| # | Claim | file:line | Triage | Proposed generalized copy |
|---|---|---|---|---|
| 1 | Employer name "Nexvision Innovations Inc." | `Experience.tsx:28`; `public/llms.txt:57`; `public/llms-full.txt:88`; `resume.md:19`; `resume.html:236` (+ HTML comment `resume.html:232`); `knowledge/digital-eric.md:50`; `agent/knowledge/digital-eric.md:50`; embedded in `public/resume.pdf` | **GENERALIZE** | `A Philippine HR-tech SaaS company` (HTML comment → `<!-- OJT employer -->`; PDF: regenerate) |
| 2 | Location "Marikina (Hybrid)" / "Marikina, Philippines (Hybrid)" | `Experience.tsx:31`; `resume.md:19`; `resume.html:240` | **GENERALIZE** | `Metro Manila (Hybrid)` — Marikina is the NDA-listed company city; re-identification risk when combined with "HR-tech SaaS" |
| 3 | Role "Full Stack Engineer (Lead Intern)", Jul–Sep 2026 | all headers above | **KEEP** | — (own role/dates, non-CI) |
| 4 | Summary: Team-Lead promotion, 12-week lifecycle, "audited payroll compliance against DOLE labor standards", "enterprise HRIS features under NDA" | `Experience.tsx:33` | **KEEP** | — (own role-level activity; DOLE is the public regulator; "under NDA" is good disclosure) |
| 5 | Tag `DOLE Audit` | `Experience.tsx:42` | **KEEP** | — |
| 6 | "DOLE-compliant payroll & timekeeping engines across **4 enterprise HRIS platforms**" | `Experience.tsx:45`; `public/llms.txt:57`; `public/llms-full.txt:89`; `resume.md:22`; `resume.html:243-247`; `knowledge/digital-eric.md:52`; `agent/knowledge/digital-eric.md:52` | **GENERALIZE** | platform count + "engines" reveal product-line breadth → `Architected labor-standards-compliant payroll & timekeeping features on the company's enterprise HRIS platform, automating overtime, holiday, and night-differential calculations.` |
| 7 | "**100% statutory compliance**" + "10 PM – 6 AM night differential" | `public/llms-full.txt:89`; `knowledge/digital-eric.md:52`; `agent/knowledge/digital-eric.md:52` | **GENERALIZE** | drop the internal audit metric → `automating statutory overtime, holiday, and night-differential rules` (night-diff hours are public labor law, but the 100% figure is an internal result) |
| 8 | "statutory deductions (**SSS, PhilHealth, Pag-IBIG**) … across **500+ employee records**" | `Experience.tsx:46`; `public/llms.txt:57`; `resume.md:23`; `resume.html:248-252` | **GENERALIZE** | agency mapping + record volume flagged per ruling → `automating government statutory deductions and 13th-month proration, with immutable audit logs` (drop agency names and the 500+ volume) |
| 9 | "engines for **SSS/WISP, PhilHealth, and Pag-IBIG regular/MP2 brackets** … **500+ employee records**" | `public/llms-full.txt:90`; `knowledge/digital-eric.md:53`; `agent/knowledge/digital-eric.md:53` | **GENERALIZE** | strongest statutory-logic leak (named program internals = NDA §2 "BIR, SSS, PhilHealth and Pag-IBIG mapping logic") → `payroll computation modules covering government statutory contribution brackets and 13th-month proration, with immutable audit logging` |
| 10 | Multi-tenant RLS "**across branch offices**" / "zero cross-**branch** data leaks" | `Experience.tsx:47`; `public/llms-full.txt:91`; `resume.md:24`; `resume.html:253-258`; `knowledge/digital-eric.md:54`; `agent/knowledge/digital-eric.md:54` | **GENERALIZE** | branch topology reveals client structure → `Secured multi-tenant HRIS data layers using PostgreSQL/Supabase Row-Level Security (RLS), eliminating cross-tenant data leaks` (keep 3-days→5-min metric where paired, e.g. `resume.md:24`) |
| 11 | "monthly **branch audit** preparation 3 days → under 5 minutes", "**DTR** attendance heatmaps", "compliance export engines" | `Experience.tsx:49`; `public/llms-full.txt:93`; `knowledge/digital-eric.md:56`; `agent/knowledge/digital-eric.md:56` | **GENERALIZE** | DTR/branch-audit/export-engine wording = internal ops + reporting logic → `Reduced monthly compliance-audit preparation time from 3 days to under 5 minutes by building interactive attendance heatmaps and high-throughput Excel/CSV export tooling` |
| 12 | "40% CI/CD acceleration (~12m→~7m), offline mock testing daemon, GitHub Actions + Jenkins" | `Experience.tsx:48`; `public/llms-full.txt:92`; `resume.md:25`; `resume.html:259-263`; `knowledge/digital-eric.md:55`; `agent/knowledge/digital-eric.md:55` | **KEEP** | — (Eric ruled generalized metrics + build tooling may stay) |
| 13 | "180+ Jira/GitHub issues" sprint leadership as Intern Team Lead | `Experience.tsx:50`; `public/llms.txt:57`; `public/llms-full.txt:94`; `resume.md:25`; `resume.html:259-263`; `knowledge/digital-eric.md:57`; `agent/knowledge/digital-eric.md:57` | **KEEP** | — (Eric ruled "180+ issues" may stay) |
| 14 | "DOLE compliance" in hero card | `src/components/Hero.tsx:57` | **KEEP** | — (no employer tie; regulatory-domain skill claim) |
| 15 | `public/resume.pdf` (146 KB; not parsed — `resume.md`/`resume.html` are its sources and carry rows 1–13) | `public/resume.pdf` | **GENERALIZE** | regenerate from corrected `resume.html`/`resume.md` after copy pass |
| 16 | Test assertions pinning the literal name/claims | `src/components/Experience.test.tsx:19,30,33`; `tests/seo.test.ts:238` | **UPDATE** (not a published surface, but CI fails otherwise) | assert the generalized strings |
| 17 | Git history + PR metadata naming the employer | repo: merge `f721694` (PR #38 branch `feat/nexvision-hris-spacing`), commits `6641d09`/`98b525f`/`6780948`/`c134252` | **FLAG** | public repo is linked from the site (`llms.txt:12`, `index.html:90`); commit titles aren't editable — options: make repo private, or accept as residual risk (out of scope for a content pass) |
| 18 | "NexHRIS" product name | — | **ABSENT** | verified: zero occurrences on any surface — keep it that way |
| 19 | Hyperlinks to Nexvision/NexHRIS, embedded screenshots, source code, architecture of the real system | — | **REMOVE: nothing found** | zero `nexvision.*`/`nexhris.*` URLs (grep); `public/assets/**` contains only personal projects, certificates, and FlyRank cohort images; no screenshots or code of the OJT system anywhere |

### Tally

- **Distinct claims needing GENERALIZE:** 8 (rows 1, 2, 6, 7, 8, 9, 10, 11) across **~30 file:line locations** incl. the PDF and the `agent/` knowledge mirror.
- **KEEP:** 6 claims (rows 3, 4, 5, 12, 13, 14).
- **REMOVE:** 0 — no screenshots, code, diagrams, client data, or product links exist.
- **FLAG (uncovered by rulings):** the `500+ employee records` volume (folded into rows 8–9, recommend dropping the number — internal scale metric under NDA §2); `Marikina` location (row 2); public git-history naming (row 17).

### Boundary notes

- `knowledge/digital-eric.md:3` states "Public information only" yet line 50 names the employer — the file self-contradicts; the same leak is mirrored verbatim into `agent/knowledge/digital-eric.md` (drift-check enforces sync, so edit both).
- `index.html`, `public/sitemap.xml`, `public/robots.txt`, `DIGITAL-ERIC.md`, `CONTEXT.md`, `Footer.tsx`, `Skills.tsx`, `Projects.tsx`, `Credentials.tsx`, `DigitalEricChat.tsx`, `src/data/*` carry no Nexvision-related claims.
- FlyRank AI is a separate internship (per map notes) and is out of this audit's NDA scope; its disclosures (certificate IDs `FR-D11-*`, cohort images) remain unflagged.

## Recommended fix order (for the execution session)

1. Generalize employer + statutory specifics in `Experience.tsx`, `llms.txt`, `llms-full.txt`, `resume.md`, `resume.html`, both `digital-eric.md` copies; regenerate `public/resume.pdf`; update `Experience.test.tsx` + `tests/seo.test.ts` assertions.
2. Add OJT Reflections section + Sample Works (NDA-safe generalized/mock artifacts) and a one-line career-objectives statement → closes the two MISSING + PARTIAL rubric rows.
3. Decide on git-history exposure (row 17) and the "4 enterprise HRIS platforms" platform-count claim (row 6).
