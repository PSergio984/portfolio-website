import heroImg from "../assets/profile.png";
import { useFadeIn } from "../hooks/useFadeIn";

const awards = [
  {
    id: "award-htb",
    label: "69th Place (Team) — HackTheBox Global Event 2026",
  },
  { id: "award-uga", label: "25th Place — UGA GoldRush Gauntlet CTF" },
  {
    id: "award-itlympics",
    label: "UMak National ITlympics Representative",
  },
  {
    id: "award-local-quiz",
    label: "1st Place — Pamantasan ng Lungsod ng Valenzuela IT Quiz Bee",
  },
  {
    id: "award-local-ctf",
    label: "2nd Place — Pamantasan ng Lungsod ng Valenzuela CTF Competition",
  },
  { id: "award-game-dev", label: "Multiple Awards — Game Development Project" },
  { id: "award-dean", label: "Dean's Lister & Magna Cum Laude Candidate" },
];

const certifications = [
  { id: "cert-google", label: "Google Cybersecurity Professional Certificate" },
  {
    id: "cert-tesda",
    label: "TESDA NC3 Visual Graphics Design (UI/UX Foundation)",
  },
];

export function Hero() {
  const { ref: textRef, fadeClass: textFade } = useFadeIn(0.1);
  const { ref: imgRef, fadeClass: imgFade } = useFadeIn(0.1);

  return (
    <section
      id="about"
      aria-label="About Eric Gabriel Manabat"
      className="py-16 md:py-24 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        {/* Text side */}
        <div
          ref={textRef}
          className={`flex-1 order-2 md:order-1 text-center md:text-left ${textFade}`}
        >
          <p className="text-sm font-mono text-[var(--accent)] mb-3 tracking-widest uppercase">
            Hello, world 👋
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-h)] leading-tight tracking-tight mb-4">
            Eric Gabriel Manabat
          </h1>
          <h2 className="text-lg md:text-xl text-[var(--text)] mb-6 leading-relaxed">
            Full-Stack Developer · Cybersecurity Enthusiast
          </h2>
          <p className="text-[var(--text)] leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
            I build secure, high-performance web applications and hunt vulnerabilities.
            Specialising in Python, PHP, and .NET, with hands-on CTF experience.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-10">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-h)] font-medium text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              View projects
            </a>
          </div>

          {/* Achievements Split */}
          <div className="flex flex-col md:flex-row gap-8 text-left">
            <div className="flex-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text)] mb-3">
                Awards & Honors
              </h3>
              <ul className="space-y-1.5">
                {awards.map((award) => (
                  <li
                    key={award.id}
                    className="text-sm text-[var(--text)] leading-relaxed"
                  >
                    {award.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text)] mb-3">
                Certifications
              </h3>
              <ul className="space-y-1.5">
                {certifications.map((cert) => (
                  <li
                    key={cert.id}
                    className="text-sm text-[var(--text)] leading-relaxed"
                  >
                    {cert.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Image side */}
        <div
          ref={imgRef}
          className={`order-1 md:order-2 flex-shrink-0 ${imgFade}`}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-border)] opacity-30 blur-lg" />
            <img
              src={heroImg}
              alt="Eric Gabriel Manabat — portrait"
              width={220}
              height={220}
              className="relative rounded-2xl object-cover shadow-xl border border-[var(--border)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
