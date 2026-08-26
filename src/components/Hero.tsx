import heroImg from '../assets/profile.png';
import { useFadeIn } from '../hooks/useFadeIn';
import { SiTryhackme, SiHackthebox } from 'react-icons/si';
import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa6';
import { Cpu, ShieldCheck, Flag, ArrowRight, Sparkles } from 'lucide-react';
import { BootDevIcon } from './icons';

const platformLinks = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/PSergio984',
    icon: FaGithub,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eric-gabriel-manabat',
    icon: FaLinkedin,
  },
  {
    id: 'bootdev',
    label: 'Boot.dev',
    href: 'https://www.boot.dev/u/eric984',
    icon: BootDevIcon,
  },
  {
    id: 'tryhackme',
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/eric.manabatseam',
    icon: SiTryhackme,
  },
  {
    id: 'hackthebox',
    label: 'HackTheBox',
    href: 'https://ctf.hackthebox.com/user/profile/1014955',
    icon: SiHackthebox,
  },
  {
    id: 'hackerrank',
    label: 'HackerRank',
    href: 'https://www.hackerrank.com/profile/eric_manabatseam',
    icon: FaHackerrank,
  },
];

const whatIDo = [
  {
    icon: Cpu,
    title: 'Full-Stack AI Engineering',
    desc: 'Architecting decoupled FastAPI AI sidecars, hybrid BM25/Vector RAG (RRF k=60), and citation-grounded agentic workflows.',
    tech: ['FastAPI', 'Python', 'React 19', 'RAG / RRF', 'SQLite FTS5'],
  },
  {
    icon: ShieldCheck,
    title: 'Secure Backend Architecture',
    desc: 'Building mission-critical enterprise systems with PostgreSQL RLS, automated PII scrubbing, DOLE compliance, and strict RBAC.',
    tech: ['Next.js', 'Laravel 11', 'PostgreSQL', 'Supabase', 'Docker'],
  },
  {
    icon: Flag,
    title: 'Cybersecurity & CTF Honors',
    desc: 'Competitive CTF player applying offensive security mindsets and defense-in-depth principles to audit production code.',
    tech: ['Silver Medal ITLympics', 'HTB Top 63/589', 'ISC2 Candidate'],
  },
];

export function Hero() {
  const { ref, fadeClass } = useFadeIn(0.05);

  return (
    <section
      id="about"
      aria-label="About Eric Gabriel Manabat"
      className="relative pt-8 pb-10 md:pt-14 md:pb-16 overflow-hidden w-full"
    >
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--accent)]/10 dark:bg-[var(--accent)]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-blue-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div ref={ref} className={`${fadeClass} w-full`}>
        {/* ── Top Header nameplate row ── */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-start items-center justify-between gap-5 mb-6 text-center sm:text-left">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2.5 flex-wrap">
              <span className="text-xs font-mono text-[var(--accent-text)] tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)]">
                Full-Stack AI Engineer
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Roles
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[var(--text-h)] leading-[1.1] tracking-tight break-words">
              Eric Gabriel Manabat
            </h1>
          </div>

          {/* Circular Nameplate Image */}
          <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 self-center sm:self-start">
            <div className="absolute -inset-1 rounded-full bg-[var(--accent-border)] opacity-40 blur-xs" />
            <img
              src={heroImg}
              alt="Eric Gabriel Manabat"
              className="relative w-full h-full rounded-full object-cover border-2 border-[var(--accent)] shadow-xl"
            />
          </div>
        </div>

        {/* ── Stand-out Tagline / Summary ── */}
        <p className="text-[var(--text)] text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-8 max-w-3xl">
          I design, build, and deploy production-ready AI-powered full-stack applications with grounded RAG pipelines,
          scalable backends, and security-first engineering. By combining modern AI architecture with competitive
          cybersecurity principles, I engineer software that is robust, test-verified, and secure by design.
        </p>

        {/* ── What I Do Cards ── */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-8 w-full">
          {whatIDo.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text)] flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md hover:border-[var(--accent-border)]"
              >
                <div>
                  <div className="mb-3 p-2 rounded-xl bg-[var(--accent-bg)] text-[var(--accent)] w-fit border border-[var(--accent-border)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-h)] mb-1.5">{item.title}</h3>
                  <p className="text-xs text-[var(--text)] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-[var(--text)] font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA Buttons & Badges ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:opacity-95 text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Schedule Interview / Contact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-h)] font-semibold text-xs hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Explore Case Studies</span>
            </a>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {platformLinks.map(({ id, label, href, icon: Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent-border)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-200 shadow-xs hover:scale-105 flex items-center justify-center"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
