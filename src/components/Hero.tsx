import heroImg from "../assets/profile.png";
import { useFadeIn } from "../hooks/useFadeIn";
import { SiTryhackme, SiHackthebox } from "react-icons/si";
import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa6";
import { Code2, ShieldCheck, Flag } from "lucide-react";

const platformLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/PSergio984",
    icon: FaGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eric-gabriel-manabat",
    icon: FaLinkedin,
  },
  {
    id: "tryhackme",
    label: "TryHackMe",
    href: "https://tryhackme.com/p/eric.manabatseam",
    icon: SiTryhackme,
  },
  {
    id: "hackthebox",
    label: "HackTheBox",
    href: "https://ctf.hackthebox.com/user/profile/1014955",
    icon: SiHackthebox,
  },
  {
    id: "hackerrank",
    label: "HackerRank",
    href: "https://www.hackerrank.com/profile/eric_manabatseam",
    icon: FaHackerrank,
  },
];

const whatIDo = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Building secure, high-performance web applications and robust backend systems.",
    tech: ["Python", "PHP", ".NET", "Secure Web Apps"],
    accentClass:
      "border-blue-500/20 text-blue-400 bg-blue-500/5 hover:border-blue-500/50 hover:shadow-blue-500/5",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    desc: "Vulnerability hunting, defense mechanisms design, and security posture auditing.",
    tech: ["Google Certified", "Vulnerability Hunting"],
    accentClass:
      "border-green-500/20 text-green-400 bg-green-500/5 hover:border-green-500/50 hover:shadow-green-500/5",
  },
  {
    icon: Flag,
    title: "CTF Competition",
    desc: "Active competitive player breaking challenges and solving security flags.",
    tech: ["Cryptography", "Forensics", "Reversing"],
    accentClass:
      "border-purple-500/20 text-purple-400 bg-purple-500/5 hover:border-purple-500/50 hover:shadow-purple-500/5",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function Hero() {
  const { ref, fadeClass } = useFadeIn(0.05);

  return (
    <section
      id="about"
      aria-label="About Eric Gabriel Manabat"
      className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden"
    >
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div ref={ref} className={`${fadeClass}`}>
        {/* ── Top Header nameplate row ── */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase select-none mb-3">
              Hello, world 👋
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold text-[var(--text-h)] leading-[1.1] tracking-tight">
              Eric Gabriel
              <br />
              Manabat
            </h1>
          </div>
          {/* Circular Nameplate Image */}
          <div className="relative flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 self-start">
            {/* Animated glowing border effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 opacity-60 blur-sm animate-pulse" />
            <img
              src={heroImg}
              alt="Eric Gabriel Manabat"
              className="relative w-full h-full rounded-full object-cover border-2 border-[var(--accent)] shadow-lg"
            />
          </div>
        </div>

        {/* ── Static Subtitle / Professional Role Tagline ── */}
        <div className="text-lg sm:text-xl text-[var(--text)] mb-6 font-medium">
          <span className="text-[var(--accent)] font-semibold">
            Full-Stack Developer{" "}
          </span>
          focused on{" "}
          <span className="text-[var(--accent)] font-semibold">
            Cybersecurity
          </span>{" "}
          & Secure Systems
        </div>

        {/* ── Stand-out Tagline / Summary ── */}
        <p className="text-[var(--text-h)] text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-2xl opacity-90">
          I build secure, high-performance web applications and hunt
          vulnerabilities. By combining full-stack engineering with hands-on CTF
          competition experience, I design robust defense mechanisms and audit
          codebases from an attacker's perspective.
        </p>

        {/* ── What I Do Cards ── */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {whatIDo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl border ${item.accentClass} flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg duration-300`}
              >
                <div>
                  <div className="mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-h)] mb-2">
                    {item.title}
                  </h3>
                  {/* High contrast description text */}
                  <p className="text-xs text-[var(--text)] leading-relaxed mb-4 font-medium opacity-95">
                    {item.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {item.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] rounded bg-[var(--code-bg)] border border-[var(--border)] text-[var(--text-h)] font-mono font-medium"
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
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity duration-200 cursor-pointer"
            >
              Get in touch <ArrowIcon />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-h)] font-medium text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
            >
              View Projects <ArrowIcon />
            </a>
          </div>

          {/* Social icons row aligned correctly */}
          <div className="flex items-center gap-4">
            {platformLinks.map(({ id, label, href, icon: Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-[var(--text)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-200 hover:drop-shadow-[0_0_6px_var(--accent)] flex items-center justify-center"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
