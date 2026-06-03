import { Award, Medal, ShieldCheck, Palette, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useFadeIn } from "../hooks/useFadeIn";

interface Credential {
  id: string;
  title: string;
  institution: string;
  date: string;
  timestamp: string;
  award: string;
  iconType: string;
  imageUrl?: string;
  profileUrl?: string;
}

const awardsData: Credential[] = [
  {
    id: "itlympics-2026",
    title: "Capture The Flag",
    institution: "ITlympics: Pamantasan ng Lungsod ng Valenzuela",
    date: "March 2026",
    timestamp: "[MAR 2026]",
    award: "Silver Medal",
    iconType: "silver",
    imageUrl: "/assets/certificates/itlympics-2026.webp",
  },
  {
    id: "hackthebox-ctf",
    title: "Global Cyber Skills Benchmark",
    institution: "HackTheBox",
    date: "2026",
    timestamp: "[MAY 2026]",
    award: "Ranked 63/589 Teams",
    iconType: "security",
    imageUrl: "/assets/certificates/HTB-Certificate-Sergio984.webp",
  },
  {
    id: "gamecon",
    title: "Hybrid Game Development",
    institution: "Gamecon: Pamantasan ng Lungsod ng Valenzuela",
    date: "2026",
    timestamp: "[MAR 2026]",
    award: "BRONZE MEDAL",
    iconType: "bronze",
    imageUrl: "/assets/certificates/gamecon.jpg",
  },
  {
    id: "14th-it-skills",
    title: "Cybersecurity Quiz Bee",
    institution: "14th National IT Skills Olympics - University of Makati",
    date: "November 2025",
    timestamp: "[NOV 2025]",
    award: "Representative",
    iconType: "rep",
    imageUrl: "/assets/certificates/umak.webp",
  },
  {
    id: "itlympics-2025",
    title: "General IT Quiz Bee",
    institution: "Pamantasan ng Lungsod ng Valenzuela",
    date: "April 2025",
    timestamp: "[APR 2025]",
    award: "GOLD MEDAL — GENERAL IT & SYSTEMS LOGIC",
    iconType: "gold",
    imageUrl: "/assets/certificates/itlympics-2025.webp",
  },
  {
    id: "deans-list",
    title: "Dean's List Academic Excellence",
    institution:
      "Pamantasan ng Lungsod ng Valenzuela — BS Information Technology",
    date: "2023 - 2026",
    timestamp: "[2023 - 2026]",
    award: "CONSISTENT DEAN'S LISTER — 1.03 RUNNING GWA",
    iconType: "gold",
    imageUrl: "/assets/certificates/deans-list.webp",
  },
];

const certificationsData: Credential[] = [
  {
    id: "google-cybersecurity",
    title: "Google Cybersecurity Professional",
    institution: "Google",
    date: "2026",
    timestamp: "[JAN 2026]",
    award: "PROFESSIONAL CERTIFICATE",
    iconType: "security",
    imageUrl: "/assets/certificates/ggcyb.webp",
  },
  {
    id: "ibm-cybersecurity",
    title: "IBM and ISC2 Cybersecurity Specialist",
    institution: "IBM",
    date: "2026",
    timestamp: "[JUNE 2026]",
    award: "PROFESSIONAL CERTIFICATE",
    iconType: "security",
    imageUrl: "/assets/certificates/ibm-cyb.png",
  },
  {
    id: "tesda-nc3",
    title: "Visual Graphics Design NC III",
    institution: "TESDA",
    date: "2022",
    timestamp: "[JULY 2023]",
    award: "NATIONAL CERTIFICATE",
    iconType: "design",
    imageUrl: "/assets/certificates/tesda-vgd.webp",
  },
  {
    id: "fastapi-rest",
    title: "Mastering REST APIs with FastAPI",
    institution: "Packt",
    date: "2026",
    timestamp: "[MAY 2026]",
    award: "COURSE CERTIFICATE",
    iconType: "design",
    imageUrl: "/assets/certificates/coursera-fastapi.png",
  },
  {
    id: "iot-intro",
    title: "An Introduction to Programming the Internet of Things (IoT)",
    institution: "UC Irvine",
    date: "2026",
    timestamp: "[MAY 2026]",
    award: "SPECIALIZATION CERTIFICATE",
    iconType: "design",
    imageUrl: "/assets/certificates/coursera-iot-specialization.png",
  },
];

const seminarsData: Credential[] = [
  {
    id: "seminar-cybersecurity",
    title:
      "Securing Connections: Strategies for Cybersecurity and Network Operations",
    institution: "Pamantasan ng Lungsod ng Valenzuela",
    date: "October 2025",
    timestamp: "[OCT 2025]",
    award: "SEMINAR CERTIFICATE",
    iconType: "security",
    imageUrl: "/assets/seminars/cyb.webp",
  },
  {
    id: "seminar-fullstack",
    title:
      "Launch Your Tech Career: The High-Demand Skillset of a Full Stack Web Developer",
    institution: "Pamantasan ng Lungsod ng Valenzuela",
    date: "September 2025",
    timestamp: "[SEPT 2025]",
    award: "SEMINAR CERTIFICATE",
    iconType: "design",
    imageUrl: "/assets/seminars/fullstack.webp",
  },
];

// Helper to pre-load verification images
function usePreloadImage(images: string[]) {
  useEffect(() => {
    images.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [images]);
}

// Shared Verification Modal Component
function VerificationModal({
  selectedCred,
  onClose,
}: {
  selectedCred: Credential | null;
  onClose: () => void;
}) {
  if (!selectedCred) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {selectedCred.imageUrl ? (
          <img
            src={selectedCred.imageUrl}
            alt={`Verification for ${selectedCred.title}`}
            className="max-w-full h-auto object-contain shadow-2xl max-h-[90vh] rounded-xl border border-white/10"
          />
        ) : (
          <div className="w-full max-w-2xl h-64 flex items-center justify-center bg-[var(--bg)] rounded-xl border border-[var(--border)] text-[var(--text)] opacity-50">
            Image verification not available
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 bg-black/60 text-white rounded-full hover:bg-black/90 transition-colors backdrop-blur-md border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// 1. AWARDS & HONORS
export function Awards() {
  const { ref, fadeClass } = useFadeIn();
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  usePreloadImage(awardsData.map((d) => d.imageUrl || ""));

  return (
    <section id="awards" className="py-8 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">
            Awards & Honors
          </h2>
          <p className="text-sm text-[var(--text)]">
            A record of competitive achievements and academic excellence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {awardsData.map((cred) => (
            <article
              key={cred.id}
              className="group flex flex-col p-4 rounded-2xl bg-white dark:bg-[var(--bg)] border border-gray-300 dark:border-[var(--border)] shadow transition-all hover:shadow-lg hover:border-[var(--accent-border)] relative overflow-hidden"
            >
              {/* Top right subtle medal icon background */}
              <div className="absolute -top-4 -right-4 opacity-10">
                <Award className="w-24 h-24 text-[var(--text)]" />
              </div>

              <div className="mb-3">
                <span className="inline-flex p-2 rounded-lg bg-[var(--code-bg)] mb-3">
                  {cred.iconType === "security" && (
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                  )}
                  {cred.iconType === "design" && (
                    <Palette className="w-5 h-5 text-pink-500" />
                  )}
                  {cred.iconType === "silver" && (
                    <Medal className="w-5 h-5 text-slate-300" />
                  )}
                  {cred.iconType === "gold" && (
                    <Medal className="w-5 h-5 text-yellow-500" />
                  )}
                  {cred.iconType === "bronze" && (
                    <Medal className="w-5 h-5 text-amber-600" />
                  )}
                  {cred.iconType === "rep" && (
                    <Award className="w-5 h-5 text-blue-500" />
                  )}
                </span>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold text-[var(--text-h)] leading-tight">
                    {cred.title}
                  </h3>
                  <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                    {cred.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[var(--text)] mb-0">
                  {cred.institution}
                </p>
              </div>

              <div className="mt-auto pt-3 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      cred.iconType === "security"
                        ? "bg-green-500"
                        : cred.iconType === "design"
                          ? "bg-pink-500"
                          : cred.iconType === "silver"
                            ? "bg-slate-300"
                            : cred.iconType === "gold"
                              ? "bg-yellow-500"
                              : cred.iconType === "bronze"
                                ? "bg-amber-600"
                                : "bg-blue-500"
                    }`}
                  />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--text-h)]">
                    {cred.award}
                  </span>
                </div>
                {cred.imageUrl && (
                  <button
                    onClick={() => setSelectedCred(cred)}
                    className="text-left text-xs font-semibold text-[var(--accent)] tracking-wider uppercase hover:underline inline-flex items-center gap-1 transition-all"
                  >
                    {cred.id === "deans-list"
                      ? "VIEW CERTIFICATE"
                      : "VIEW VERIFICATION"}
                    <span aria-hidden="true">&gt;</span>
                  </button>
                )}
                {cred.profileUrl && (
                  <a
                    href={cred.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left text-xs font-bold text-[var(--accent)] tracking-wider uppercase hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    VIEW PROFILE <span aria-hidden="true">&gt;</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <VerificationModal
        selectedCred={selectedCred}
        onClose={() => setSelectedCred(null)}
      />
    </section>
  );
}

// 2. PROFESSIONAL CERTIFICATIONS (Timeline/List)
export function Certifications() {
  const { ref, fadeClass } = useFadeIn();
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  usePreloadImage(certificationsData.map((d) => d.imageUrl || ""));

  const getStatusColor = (type: string) => {
    switch (type) {
      case "security":
        return "bg-emerald-500 border-emerald-500/20";
      case "design":
        return "bg-pink-500 border-pink-500/20";
      default:
        return "bg-blue-500 border-blue-500/20";
    }
  };

  return (
    <section id="certifications" className="py-8 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">
            Professional Certifications
          </h2>
          <p className="text-sm text-[var(--text)]">
            Formal verification of specialized technical skills.
          </p>
        </div>

        {/* Minimal Timeline List */}
        <div className="relative pl-4 sm:pl-6 border-l border-[var(--border)] ml-2 sm:ml-4 space-y-6 my-4">
          {certificationsData.map((cred) => (
            <div key={cred.id || cred.title} className="relative group">
              {/* Timeline dot */}
              <span
                className={`absolute -left-[25px] sm:-left-[33px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-4 bg-[var(--bg)] transition-transform group-hover:scale-125 duration-200 ${getStatusColor(cred.iconType)}`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-base font-bold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {cred.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                      {cred.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                    <span className="font-semibold">{cred.institution}</span>
                    <span>&bull;</span>
                    <span className="uppercase tracking-wider text-[10px] text-gray-500 font-medium">
                      {cred.award}
                    </span>
                  </div>
                </div>

                {cred.imageUrl && (
                  <div className="sm:text-right shrink-0">
                    <button
                      onClick={() => setSelectedCred(cred)}
                      className="text-xs font-semibold text-[var(--accent)] tracking-wider uppercase hover:underline inline-flex items-center gap-1 transition-all"
                    >
                      VIEW VERIFICATION <span aria-hidden="true">&gt;</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <VerificationModal
        selectedCred={selectedCred}
        onClose={() => setSelectedCred(null)}
      />
    </section>
  );
}

// 3. SEMINARS & WORKSHOPS (Timeline/List)
export function Seminars() {
  const { ref, fadeClass } = useFadeIn();
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  usePreloadImage(seminarsData.map((d) => d.imageUrl || ""));

  const getStatusColor = (type: string) => {
    switch (type) {
      case "security":
        return "bg-emerald-500 border-emerald-500/20";
      case "design":
        return "bg-pink-500 border-pink-500/20";
      default:
        return "bg-blue-500 border-blue-500/20";
    }
  };

  return (
    <section id="seminars" className="py-12 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">
            Seminars & Workshops
          </h2>
          <p className="text-sm text-[var(--text)]">
            Participation in specialized tech seminars and industry briefings.
          </p>
        </div>

        {/* Minimal Timeline List */}
        <div className="relative pl-4 sm:pl-6 border-l border-[var(--border)] ml-2 sm:ml-4 space-y-8 my-4">
          {seminarsData.map((cred) => (
            <div key={cred.id || cred.title} className="relative group">
              {/* Timeline dot */}
              <span
                className={`absolute -left-[25px] sm:-left-[33px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-4 bg-[var(--bg)] transition-transform group-hover:scale-125 duration-200 ${getStatusColor(cred.iconType)}`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-base font-bold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {cred.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                      {cred.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                    <span className="font-semibold">{cred.institution}</span>
                    <span>&bull;</span>
                    <span className="uppercase tracking-wider text-[10px] text-gray-500 font-medium">
                      {cred.award}
                    </span>
                  </div>
                </div>

                {cred.imageUrl && (
                  <div className="sm:text-right shrink-0">
                    <button
                      onClick={() => setSelectedCred(cred)}
                      className="text-xs font-semibold text-[var(--accent)] tracking-wider uppercase hover:underline inline-flex items-center gap-1 transition-all"
                    >
                      VIEW CERTIFICATE <span aria-hidden="true">&gt;</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <VerificationModal
        selectedCred={selectedCred}
        onClose={() => setSelectedCred(null)}
      />
    </section>
  );
}
