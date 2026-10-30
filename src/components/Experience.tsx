import { Briefcase, ShieldCheck, Eye } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { VerificationModal, type VerificationItem } from './VerificationModal';

interface ExperienceProof {
  title: string;
  code: string;
  award: string;
  date: string;
  timestamp: string;
  imageUrl: string;
}

interface ExperienceEntry {
  company: string;
  role: string;
  timestamp: string;
  location: string;
  department?: string;
  skillsDeveloped?: string[];
  summary: string;
  bullets: string[];
  tags: string[];
  proofs?: ExperienceProof[];
}

const experienceData: ExperienceEntry[] = [
  {
    company: 'Nexvision Innovations Inc.',
    role: 'Full Stack Engineer (Lead Intern)',
    timestamp: '[JUL – SEPT 2026]',
    location: 'Marikina (Hybrid)',
    department: 'Software Development',
    skillsDeveloped: [
      'Technical Leadership',
      'Sprint Execution',
      'TypeScript Review',
      'Payroll-Domain Modeling',
      'RLS Data Security',
      'CI/CD Engineering',
      'Knowledge Transfer',
    ],
    summary:
      'Promoted to Intern Team Lead across a 12-week lifecycle; led sprint execution, audited payroll compliance against DOLE labor standards, and delivered mission-critical enterprise HRIS features under NDA.',
    tags: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Zustand',
      'Jenkins',
      'GitHub Actions',
      'DOLE Audit',
    ],
    bullets: [
      'Architected DOLE-compliant payroll & timekeeping engines across 4 enterprise HRIS platforms, automating complex overtime, holiday, and night differential calculations.',
      'Built modular TypeScript/Next.js HRIS payroll engines automating statutory deductions (SSS, PhilHealth, Pag-IBIG) and 13th-month proration across 500+ employee records with immutable audit logs.',
      'Secured multi-tenant HRIS data layers across branch offices using PostgreSQL/Supabase Row-Level Security (RLS), eliminating cross-branch data leaks.',
      'Accelerated CI/CD build and test execution cycles by 40% (cutting runner execution times from ~12m to ~7m) with an offline mock testing daemon in GitHub Actions and Jenkins to eliminate flaky external DNS timeouts.',
      'Reduced monthly branch audit preparation time from 3 days to under 5 minutes by building interactive DTR attendance heatmaps with Zustand state persistence and high-throughput multi-sheet Excel/CSV compliance export engines.',
      'Led sprint execution across 180+ Jira/GitHub issues as Intern Team Lead, delegating frontend/backend tasks across the intern team, conducting code reviews for TypeScript type safety, and enforcing clean architectural standards.',
    ],
  },
  {
    company: 'FlyRank AI',
    role: 'Full-Stack AI Engineer Intern',
    timestamp: '[JUL – SEPT 2026]',
    location: 'Remote',
    department: 'Backend AI Engineering Program',
    skillsDeveloped: [
      'Hybrid RAG Pipelines',
      'FastAPI Microservices',
      'SSE Streaming',
      'LLM Evaluation',
      'Observability',
    ],
    summary:
      'Completed Backend AI Engineering and AI Fluency internship programs with verified distinction (Sept 2026); engineered decoupled AI microservices, autonomous RAG pipelines, and hybrid neural retrieval architectures with end-to-end telemetry and LLM-as-judge evaluation.',
    tags: [
      'FastAPI',
      'Python',
      'Hybrid RRF (k=60)',
      'SQLite FTS5',
      'SSE Streaming',
      'Prometheus',
      'LLM-as-Judge',
    ],
    bullets: [
      'Graduated from the Backend AI Engineering and AI Fluency Internship Programs (Certificate IDs: FR-D11-28D6B-6AC8A, FR-D11-8C634-C586C, Sept 2026) with verified distinction.',
      'Architected and deployed an autonomous FastAPI AI sidecar microservice, increasing retrieval accuracy from 81.8% to 86.4% Top-1 on ground-truth benchmarks by engineering hybrid BM25 + dense vector search with Reciprocal Rank Fusion (RRF k=60) and deterministic blend reranking.',
      'Eliminated out-of-domain hallucinations to achieve a 100% negative query pass rate and 90% LLM-as-judge relevance score by designing a bounded 3-step agentic query loop with cosine similarity gating (<0.50 threshold) and inline numbered citations.',
      'Reduced time-to-first-token (TTFT) by ~65% and established real-time observability across production deployments by implementing asynchronous Server-Sent Events (SSE) streaming APIs, Prometheus /metrics latency histograms, and Grafana telemetry dashboards.',
    ],
    proofs: [
      {
        title: 'Backend AI Engineering Internship Program',
        code: 'FR-D11-28D6B-6AC8A',
        award: 'INTERNSHIP GRADUATION',
        date: 'July 2026 — September 2026',
        timestamp: '[JUL – SEPT 2026]',
        imageUrl: '/assets/cohorts/flyrank-backend-ai.webp',
      },
      {
        title: 'AI Fluency Internship Program',
        code: 'FR-D11-8C634-C586C',
        award: 'INTERNSHIP COMPLETION',
        date: 'July 2026 — September 2026',
        timestamp: '[JUL – SEPT 2026]',
        imageUrl: '/assets/cohorts/flyrank-ai-fluency.webp',
      },
    ],
  },
  {
    company: 'Mashup Garage',
    role: 'Software Engineering Intern',
    timestamp: '[OCT 2026 – PRESENT]',
    location: 'Remote',
    department: 'Software Engineering',
    skillsDeveloped: [
      'Production-Readiness Auditing',
      'Infrastructure Migration',
      'Backlog Triage',
      'Code Review',
      'Agile Delivery',
    ],
    summary:
      'Current internship — production-readiness work on a full-stack project-management platform: infrastructure migrations, codebase audit findings carded to the backlog, and full implement → PR → review delivery loops.',
    tags: [
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Object Storage',
      'Code Review',
      'Agile Delivery',
    ],
    bullets: [
      'Provisioned the platform locally on day one — migrated the database, object storage, and local email tooling onto the team’s Supabase-based stack.',
      'Ran a production-readiness audit across the codebase and carded ~20 triaged findings to the team backlog, reconciling each with reviewers before implementation.',
      'Delivered a multi-branch implementation loop across audit tickets with PR review cycles, moving fixes from backlog to code review under team conventions.',
    ],
  },
];

interface SampleWork {
  title: string;
  desc: string;
  tags: string[];
}

const sampleWorks: SampleWork[] = [
  {
    title: 'Statutory Payroll & Timekeeping Engines',
    desc: "Automated government statutory deductions, 13th-month proration, and complex overtime/holiday/night-differential rules with immutable audit logs — shipped across the company's enterprise HRIS platforms.",
    tags: ['TypeScript', 'Payroll Logic', 'Audit Trails'],
  },
  {
    title: 'Multi-Tenant Data Security',
    desc: 'Row-Level Security data layers (PostgreSQL/Supabase RLS) eliminating cross-tenant data leaks across client deployments — tenant-isolated access verified end-to-end.',
    tags: ['PostgreSQL', 'Supabase RLS', 'Multi-Tenant'],
  },
  {
    title: 'CI/CD Mock Testing Daemon',
    desc: 'Offline mock testing daemon in GitHub Actions and Jenkins that cut CI test runs by 40% (~12m → ~7m) by removing flaky external DNS timeouts.',
    tags: ['GitHub Actions', 'Jenkins', 'Test Infra'],
  },
];

const reflections = [
  "Twelve weeks at Nexvision closed the gap between school code and production code. I arrived having only read about sprint rituals, NDAs, and code review — and left having lived them daily: shipping features on a real enterprise codebase, treating confidential information as a discipline, and learning that 'correct' in payroll means correct to the centavo because real pay depends on it.",
  "My proudest contribution wasn't a single feature — it was earning Intern Team Lead and learning to multiply the team's output instead of just my own: delegating across 180+ tracked issues, reviewing TypeScript for type safety, and building the CI mock daemon that gave everyone ~40% faster test runs. The statutory payroll engines and RLS data layers I built mattered, but the team-lead scope taught me more about engineering than any ticket did.",
  "If I did it again, I'd start handover documentation from week one — writing the turnover document in September taught me how much context lives only in your head until you write it down. I'm carrying that discipline into my current internship at Mashup Garage, where production-readiness audits and knowledge transfer are already part of my day-to-day.",
];

export function Experience() {
  const { ref, fadeClass } = useFadeIn();
  const [selectedProof, setSelectedProof] = useState<VerificationItem | null>(null);

  return (
    <section id="experience" aria-label="OJT Experience" className="py-10 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="mb-8">
          <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-1 px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)] w-fit">
            On-the-Job Training
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-h)] mt-1.5">
            OJT Experience
          </h2>
        </div>

        <div className="space-y-6">
          {experienceData.map((exp, i) => (
            <Fragment key={exp.company}>
              <article className="p-6 sm:p-7 rounded-2xl bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all duration-200 shadow-[var(--shadow-card)] space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[var(--border)]">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-h)]">
                        {exp.role}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]">
                        {exp.timestamp}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span className="font-semibold text-[var(--text-h)]">{exp.company}</span>
                      <span>&bull;</span>
                      <span>{exp.location}</span>
                      {exp.department && (
                        <>
                          <span>&bull;</span>
                          <span>{exp.department} Dept.</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {exp.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed italic">
                  &ldquo;{exp.summary}&rdquo;
                </p>

                {/* Bullets formatted in Google XYZ (Accomplished X as measured by Y by doing Z) */}
                <ul className="space-y-2.5">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 32)}
                      className="flex gap-3 text-xs sm:text-sm text-[var(--text)] leading-relaxed"
                    >
                      <span className="text-[var(--accent)] font-mono font-bold mt-0.5 shrink-0">
                        &gt;
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills & competencies developed */}
                {exp.skillsDeveloped && exp.skillsDeveloped.length > 0 && (
                  <div className="pt-3.5 border-t border-[var(--border)]">
                    <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-2.5">
                      Skills &amp; Competencies Developed
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skillsDeveloped.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verified Program Proofs */}
                {exp.proofs && exp.proofs.length > 0 && (
                  <div className="pt-3.5 mt-3 border-t border-[var(--border)]">
                    <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)] w-fit">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Program Proofs</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {exp.proofs.map((proof) => (
                        <div
                          key={proof.code}
                          className="p-4 rounded-2xl bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all flex flex-col justify-between gap-2.5 shadow-[var(--shadow-card)]"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1.5 mb-1.5">
                              <span className="text-[10px] font-mono font-semibold text-[var(--accent-text)] bg-[var(--accent-bg)] px-2 py-0.5 rounded-md border border-[var(--accent-border)]">
                                {proof.award}
                              </span>
                              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                                {proof.timestamp}
                              </span>
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-[var(--text-h)] leading-snug">
                              {proof.title}
                            </div>
                            <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">
                              ID: {proof.code}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border)]">
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">
                              {proof.date}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedProof({
                                  title: `${proof.title} (${proof.code})`,
                                  imageUrl: proof.imageUrl,
                                })
                              }
                              className="text-xs font-semibold text-[var(--accent-text)] hover:underline inline-flex items-center gap-1.5 cursor-pointer bg-[var(--accent-bg)] hover:bg-[var(--card-hover)] px-2.5 py-1 rounded-lg transition-colors border border-[var(--accent-border)] shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Proof</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Sample Works on OJT — directly under the Nexvision entry they document */}
              {i === 0 && (
                <div>
                  <div className="mb-5">
                    <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-1 px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)] w-fit">
                      Evidence & Artifacts
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-h)] mt-1.5">
                      Sample Works on OJT
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {sampleWorks.map((work) => (
                      <div
                        key={work.title}
                        className="p-5 rounded-2xl bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all duration-200 shadow-[var(--shadow-card)] flex flex-col gap-3"
                      >
                        <div className="text-sm font-bold text-[var(--text-h)] leading-snug">
                          {work.title}
                        </div>
                        <p className="text-xs text-[var(--text)] leading-relaxed flex-grow">
                          {work.desc}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {work.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <figure className="mt-4 p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-[var(--shadow-card)]">
                    <img
                      src="/assets/ojt/hris-login-redacted.webp"
                      alt="Client-branded multi-tenant HRIS login page with tenant name redacted"
                      className="w-full rounded-xl border border-[var(--border)]"
                      loading="lazy"
                    />
                    <figcaption className="mt-3 text-[11px] font-mono text-[var(--text-muted)] text-center">
                      Client-branded multi-tenant HRIS login — tenant name redacted (NDA)
                    </figcaption>
                  </figure>

                  {/* Reflections */}
                  <div className="mt-10">
                    <div className="mb-5">
                      <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-1 px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)] w-fit">
                        Learning in First Person
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-h)] mt-1.5">
                        Reflections
                      </h3>
                    </div>
                    <div className="p-6 sm:p-7 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-[var(--shadow-card)] space-y-4">
                      {reflections.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="text-xs sm:text-sm text-[var(--text)] leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <VerificationModal item={selectedProof} onClose={() => setSelectedProof(null)} />
    </section>
  );
}
