import { Briefcase } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

interface ExperienceEntry {
  company: string;
  role: string;
  timestamp: string;
  summary: string;
  bullets: string[];
}

const experienceData: ExperienceEntry[] = [
  {
    company: 'Flyrank',
    role: 'Backend AI Engineer — Intern',
    timestamp: '[JUL – AUG 2026]',
    summary: 'Shipped backend AI features.',
    bullets: [
      'Built agentic AI workflows and conversational AI services.',
      'Retro-fitted AI agents into existing projects — adding an AI layer without rewriting what already worked.',
    ],
  },
  {
    company: 'Nexvision Innovations Inc.',
    role: 'Software Engineering Intern — HRIS SWE Team',
    timestamp: '[JUN – SEP 2026]',
    summary:
      'Maintaining and enhancing four white-label HRIS products (client names under NDA) across payroll, attendance, and employee records. Promoted to team lead for the intern group mid-internship.',
    bullets: [
      'Fixed payroll-engine correctness issues: night-differential double-counting, overtime edge cases, and statutory deduction validation (SSS / PhilHealth / Pag-IBIG) — backed by new automated tests.',
      'Audited and fixed bugs spanning authentication security, row-level-security policies, holiday computation, and CI pipelines.',
      'Shipped features end-to-end: attendance heatmap scheduling, print-ready payroll Excel exports, and descriptive empty-state UX across table views.',
      'Assigned GitHub issues to fellow interns based on supervisor direction.',
    ],
  },
];

export function Experience() {
  const { ref, fadeClass } = useFadeIn();

  return (
    <section id="experience" className="py-8 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">Experience</h2>
          <p className="text-sm text-[var(--text)]">
            Where I&apos;ve applied the stack — internships with real production impact.
          </p>
        </div>

        <div className="relative pl-4 sm:pl-6 border-l border-[var(--border)] ml-2 sm:ml-4 space-y-8 my-4">
          {experienceData.map((exp) => (
            <div key={exp.company} className="relative group">
              <span className="absolute -left-[25px] sm:-left-[33px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-4 bg-[var(--accent)] border-[var(--accent-border)] transition-transform group-hover:scale-125 duration-200" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-base font-bold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                      {exp.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="font-semibold">{exp.company}</span>
                  </div>
                  <p className="text-xs text-[var(--text)] leading-relaxed max-w-2xl pt-1">
                    {exp.summary}
                  </p>
                </div>
              </div>

              <ul className="space-y-1.5 mt-3">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-xs text-[var(--text)] leading-relaxed">
                    <span aria-hidden="true" className="text-[var(--accent)] font-mono">
                      &gt;
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
