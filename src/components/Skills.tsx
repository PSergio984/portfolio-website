import type { ReactNode } from 'react';
import { Code2, Cpu, LayoutTemplate, Database, Cloud, ShieldCheck } from 'lucide-react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiFastapi,
  SiLaravel,
  SiDotnet,
  SiBurpsuite,
  SiWireshark,
  SiKalilinux,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiLivewire,
  SiAlpinedotjs,
  SiFigma,
  SiPostgresql,
  SiSupabase,
  SiSqlite,
  SiRedis,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiJenkins,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiVercel,
  SiRailway,
  SiCloudflare,
  SiRender,
  SiGit,
  SiGithub,
  SiPostman,
  SiSwagger,
  SiSentry,
  SiVite,
  SiTrello,
  SiJira,
  SiOpencv,
  SiLangchain,
  SiNodedotjs,
  SiGooglecloud,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FaAws } from 'react-icons/fa6';
import { useFadeIn } from '../hooks/useFadeIn';
import shadcnLogo from '../assets/shadcn.svg';
import { MaryUiIcon, FilamentIcon } from './icons';

interface SkillItem {
  name: string;
  icon?: React.ComponentType<{ className?: string }> | null;
  customIcon?: ReactNode;
  color?: string;
}

interface SkillGroup {
  label: string;
  icon: ReactNode;
  skills: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    label: 'Programming Languages',
    icon: <Code2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />,
    skills: [
      { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600 dark:text-blue-400' },
      { name: 'JavaScript', icon: SiJavascript, color: 'text-amber-500 dark:text-yellow-400' },
      { name: 'Python', icon: SiPython, color: 'text-blue-600 dark:text-blue-400' },
      { name: 'PHP', icon: SiPhp, color: 'text-indigo-600 dark:text-indigo-400' },
      { name: 'Java', icon: FaJava, color: 'text-orange-600 dark:text-orange-500' },
      { name: 'C# / .NET', icon: SiDotnet, color: 'text-purple-600 dark:text-purple-400' },
    ],
  },
  {
    label: 'AI & RAG Engineering',
    icon: <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    skills: [
      { name: 'LangChain / LangGraph', icon: SiLangchain, color: 'text-emerald-600 dark:text-emerald-400' },
      { name: 'Hybrid RRF Search', icon: Database, color: 'text-cyan-600 dark:text-cyan-400' },
      { name: 'FastAPI AI Sidecars', icon: SiFastapi, color: 'text-teal-600 dark:text-teal-400' },
      { name: 'pgvector Embeddings', icon: SiPostgresql, color: 'text-blue-600 dark:text-blue-400' },
      { name: 'YOLOv8 & OpenCV', icon: SiOpencv, color: 'text-emerald-600 dark:text-green-400' },
      { name: 'LLM-as-Judge Evaluation', icon: Cpu, color: 'text-purple-600 dark:text-purple-400' },
      { name: 'Prometheus Telemetry', icon: SiPrometheus, color: 'text-orange-600 dark:text-orange-400' },
      { name: 'Grafana Dashboards', icon: SiGrafana, color: 'text-amber-600 dark:text-amber-400' },
    ],
  },
  {
    label: 'Frontend & UI Engineering',
    icon: <LayoutTemplate className="w-4 h-4 text-pink-600 dark:text-pink-400" />,
    skills: [
      { name: 'Next.js (App Router)', icon: SiNextdotjs, color: 'text-slate-900 dark:text-white' },
      { name: 'React 19', icon: SiReact, color: 'text-sky-600 dark:text-sky-400' },
      { name: 'Tailwind CSS v4', icon: SiTailwindcss, color: 'text-cyan-600 dark:text-cyan-400' },
      {
        name: 'shadcn/ui',
        customIcon: <img src={shadcnLogo} alt="shadcn/ui" className="w-3.5 h-3.5 object-contain" />,
      },
      { name: 'MaryUI', icon: MaryUiIcon, color: 'text-amber-600 dark:text-amber-400' },
      { name: 'Filament 4', icon: FilamentIcon, color: 'text-orange-600 dark:text-orange-400' },
      { name: 'Livewire 3', icon: SiLivewire, color: 'text-pink-600 dark:text-pink-400' },
      { name: 'Alpine.js', icon: SiAlpinedotjs, color: 'text-sky-600 dark:text-sky-400' },
      { name: 'Zustand Store', icon: SiReact, color: 'text-amber-600 dark:text-amber-300' },
      { name: 'Figma', icon: SiFigma, color: 'text-purple-600 dark:text-purple-400' },
    ],
  },
  {
    label: 'Backend & Data Architecture',
    icon: <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    skills: [
      { name: 'FastAPI', icon: SiFastapi, color: 'text-teal-600 dark:text-teal-400' },
      { name: 'Laravel 11 / 12', icon: SiLaravel, color: 'text-red-600 dark:text-red-500' },
      { name: 'Node.js', icon: SiNodedotjs, color: 'text-emerald-600 dark:text-emerald-400' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-indigo-600 dark:text-indigo-400' },
      { name: 'Supabase', icon: SiSupabase, color: 'text-emerald-600 dark:text-emerald-400' },
      { name: 'SQLite FTS5', icon: SiSqlite, color: 'text-sky-600 dark:text-sky-400' },
      { name: 'Redis', icon: SiRedis, color: 'text-red-600 dark:text-red-500' },
      { name: 'MySQL', icon: SiMysql, color: 'text-orange-600 dark:text-orange-400' },
      { name: 'MongoDB', icon: SiMongodb, color: 'text-emerald-600 dark:text-green-500' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    icon: <Cloud className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
    skills: [
      { name: 'AWS', icon: FaAws, color: 'text-amber-600 dark:text-amber-400' },
      { name: 'Google Cloud (GCP)', icon: SiGooglecloud, color: 'text-blue-600 dark:text-blue-400' },
      { name: 'Docker', icon: SiDocker, color: 'text-sky-600 dark:text-sky-400' },
      { name: 'Jenkins CI/CD', icon: SiJenkins, color: 'text-red-600 dark:text-red-400' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: 'text-blue-600 dark:text-blue-400' },
      { name: 'Vercel', icon: SiVercel, color: 'text-slate-900 dark:text-white' },
      { name: 'Cloudflare', icon: SiCloudflare, color: 'text-orange-600 dark:text-orange-400' },
      { name: 'Render', icon: SiRender, color: 'text-teal-600 dark:text-teal-400' },
      { name: 'Railway', icon: SiRailway, color: 'text-pink-600 dark:text-pink-400' },
    ],
  },
  {
    label: 'Cybersecurity & Engineering Tools',
    icon: <ShieldCheck className="w-4 h-4 text-red-600 dark:text-red-400" />,
    skills: [
      { name: 'Burp Suite', icon: SiBurpsuite, color: 'text-orange-600 dark:text-orange-500' },
      { name: 'Wireshark', icon: SiWireshark, color: 'text-blue-600 dark:text-blue-500' },
      { name: 'Kali Linux', icon: SiKalilinux, color: 'text-blue-600 dark:text-blue-400' },
      { name: 'Git', icon: SiGit, color: 'text-orange-600 dark:text-orange-500' },
      { name: 'GitHub', icon: SiGithub, color: 'text-slate-900 dark:text-white' },
      { name: 'Postman', icon: SiPostman, color: 'text-orange-600 dark:text-orange-400' },
      { name: 'Swagger / OpenAPI', icon: SiSwagger, color: 'text-emerald-600 dark:text-green-400' },
      { name: 'Sentry', icon: SiSentry, color: 'text-purple-600 dark:text-purple-400' },
      { name: 'Vite', icon: SiVite, color: 'text-purple-600 dark:text-purple-400' },
      { name: 'Jira', icon: SiJira, color: 'text-blue-600 dark:text-blue-500' },
      { name: 'Trello', icon: SiTrello, color: 'text-blue-600 dark:text-blue-400' },
    ],
  },
];

export function Skills() {
  const { ref, fadeClass } = useFadeIn();

  return (
    <section id="skills" aria-label="Technical Skills Index" className="py-8 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-1">
              Technical Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-h)]">Skills & Technology Stack</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-md">
            Production-tested stack spanning AI retrieval, full-stack backends, modern frontend, and security tools.
          </p>
        </div>

        {/* High-Density 2/3 Column Grid with Rich Branded Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="p-5 rounded-2xl bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all duration-200 shadow-[var(--shadow-card)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[var(--border)]">
                  {group.icon}
                  <h3 className="text-xs font-bold text-[var(--text-h)] uppercase tracking-wider font-mono">
                    {group.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const IconComponent = skill.icon;
                    return (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/70 font-medium hover:border-[var(--accent-border)] transition-colors shadow-2xs"
                      >
                        {skill.customIcon ? (
                          skill.customIcon
                        ) : IconComponent ? (
                          <IconComponent className={`w-3.5 h-3.5 shrink-0 ${skill.color || ''}`} />
                        ) : null}
                        <span>{skill.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
