import { Briefcase } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

interface ExperienceEntry {
  company: string;
  role: string;
  timestamp: string;
  location: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

const experienceData: ExperienceEntry[] = [
  {
    company: 'FlyRank AI',
    role: 'Full-Stack AI Engineer Intern',
    timestamp: '[JUN 2026 – PRESENT]',
    location: 'Remote',
    summary:
      'Engineered decoupled AI microservices, autonomous RAG pipelines, and hybrid neural retrieval architectures with end-to-end telemetry and LLM-as-judge evaluation.',
    tags: ['FastAPI', 'Python', 'Hybrid RRF (k=60)', 'SQLite FTS5', 'SSE Streaming', 'Prometheus', 'LLM-as-Judge'],
    bullets: [
      'Architected and deployed an autonomous FastAPI AI sidecar microservice, increasing retrieval accuracy from 81.8% to 86.4% Top-1 on ground-truth benchmarks by engineering hybrid BM25 + dense vector search with Reciprocal Rank Fusion (RRF k=60) and deterministic blend reranking.',
      'Eliminated out-of-domain hallucinations to achieve a 100% negative query pass rate and 90% LLM-as-judge relevance score by designing a bounded 3-step agentic query loop with cosine similarity gating (<0.50 threshold) and inline numbered citations.',
      'Reduced time-to-first-token (TTFT) by ~65% and established real-time observability across production deployments by implementing asynchronous Server-Sent Events (SSE) streaming APIs, Prometheus /metrics latency histograms, and Grafana telemetry dashboards.',
    ],
  },
  {
    company: 'Nexvision Innovations Inc.',
    role: 'Full Stack Software Engineering Intern — Team Lead',
    timestamp: '[JUN 2026 – PRESENT]',
    location: 'Marikina (Hybrid)',
    summary:
      'Promoted to Intern Team Lead across a 12-week lifecycle; led sprint execution, audited payroll compliance against DOLE labor standards, and delivered mission-critical enterprise HRIS features under NDA.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Zustand', 'Jenkins', 'GitHub Actions', 'DOLE Audit'],
    bullets: [
      'Ensured 100% compliance with Department of Labor and Employment (DOLE) statutory standards across 4 enterprise HRIS applications by auditing payroll calculation engines and implementing interval-partitioned time algorithms to isolate 10 PM – 6 AM night differentials from standard overtime multipliers.',
      'Automated statutory multi-tier payroll deductions and 13th-month proration across 500+ employee records by developing TypeScript/Next.js calculation modules for progressive SSS/WISP, PhilHealth, and Pag-IBIG regular/MP2 brackets with immutable audit logging.',
      'Prevented cross-branch data leaks and strengthened multi-tenant data isolation by auditing Supabase and PostgreSQL data-access layers and implementing strict branch-scoped row-level query constraints.',
      'Accelerated CI/CD build and test execution cycles by 40% (cutting runner execution times from ~12m to ~7m) by architecting an offline mock testing daemon in GitHub Actions and Jenkins to eliminate flaky external DNS timeouts.',
      'Reduced monthly branch audit preparation time from 3 days to under 5 minutes by building interactive DTR attendance heatmaps with Zustand state persistence and high-throughput multi-sheet Excel/CSV compliance export engines.',
      'Accelerated team sprint velocity across 180+ Jira/GitHub issues as Intern Team Lead by delegating frontend/backend tasks, conducting peer code reviews for TypeScript type safety, and enforcing clean architectural standards.',
    ],
  },
];

export function Experience() {
  const { ref, fadeClass } = useFadeIn();

  return (
    <section id="experience" aria-label="Professional Experience" className="py-10 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="mb-8">
          <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-1 px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)] w-fit">
            Production Experience
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-h)] mt-1.5">Engineering Internships & Leadership</h2>
        </div>

        <div className="space-y-6">
          {experienceData.map((exp) => (
            <article
              key={exp.company}
              className="p-6 sm:p-7 rounded-2xl bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all duration-200 shadow-[var(--shadow-card)] space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[var(--border)]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-h)]">{exp.role}</h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]">
                      {exp.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
                    <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="font-semibold text-[var(--text-h)]">{exp.company}</span>
                    <span>&bull;</span>
                    <span>{exp.location}</span>
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
                  <li key={bullet.slice(0, 32)} className="flex gap-3 text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                    <span className="text-[var(--accent)] font-mono font-bold mt-0.5 shrink-0">&gt;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
