import { Award, Medal, ShieldCheck, Palette, X } from "lucide-react";
import { useState } from "react";
import { useFadeIn } from "../hooks/useFadeIn";

const awardsData = [
  {
    id: "itlympics-2026",
    title: "ITlympics 2026",
    institution: "Pamantasan ng Lungsod ng Valenzuela",
    date: "March 2026",
    timestamp: "[MAR 2026]",
    award: "SILVER MEDAL",
    iconType: "silver",
    imageUrl: "/assets/certificates/itlympics-2026.png",
  },
  {
    id: "hackthebox-ctf",
    title: "Global Cyber Skills Benchmark",
    institution: "HackTheBox",
    date: "2026",
    timestamp: "[MAY 2026]",
    award: "Ranked 63/589 Teams",
    iconType: "security",
    imageUrl: "/assets/certificates/HTB-Certificate-Sergio984.png",
  },
  {
    id: "gamecon",
    title: "Gamecon",
    institution: "Pamantasan ng Lungsod ng Valenzuela",
    date: "2026",
    timestamp: "[MAR 2026]",
    award: "BRONZE MEDAL",
    iconType: "bronze",
    imageUrl: "https://placehold.co/800x600/1e1e1e/22c55e?text=HackTheBox+CTF",
  },
  {
    id: "14th-it-skills",
    title: "14th National IT Skills Olympics",
    institution: "University of Makati",
    date: "November 2025",
    timestamp: "[NOV 2025]",
    award: "Representative",
    iconType: "rep",
    imageUrl:
      "https://placehold.co/800x600/1e1e1e/3b82f6?text=IT+Skills+Olympics",
  },
  {
    id: "itlympics-2025",
    title: "ITlympics 2025",
    institution: "Pamantasan ng Lungsod ng Valenzuela",
    date: "April 2025",
    timestamp: "[APR 2025]",
    award: "GOLD MEDAL",
    iconType: "gold",
    imageUrl: "/assets/certificates/itlympics-2025.png",
  },
];

const certificationsData = [
  {
    id: "google-cybersecurity",
    title: "Google Cybersecurity Professional",
    institution: "Google",
    date: "2026",
    timestamp: "[JAN 2026]",
    award: "PROFESSIONAL CERTIFICATE",
    iconType: "security",
    imageUrl:
      "https://placehold.co/800x600/1e1e1e/22c55e?text=Google+Cybersecurity",
  },
  {
    id: "tesda-nc3",
    title: "Visual Graphics Design NC III",
    institution: "TESDA",
    date: "2022",
    timestamp: "[JULY 2023]",
    award: "NATIONAL CERTIFICATE",
    iconType: "design",
    imageUrl:
      "https://placehold.co/800x600/1e1e1e/ec4899?text=Visual+Graphics+NC+III",
  },
  {
    id: "tesda-nc2",
    title: "Animation NC II",
    institution: "TESDA",
    date: "2022",
    timestamp: "[JULY 2023]",
    award: "NATIONAL CERTIFICATE",
    iconType: "design",
    imageUrl: "https://placehold.co/800x600/1e1e1e/ec4899?text=Animation+NC+II",
  },
];

interface Credential {
  id: string;
  title: string;
  institution: string;
  date: string;
  timestamp: string;
  award: string;
  iconType: string;
  imageUrl?: string;
}

export function Credentials() {
  const { ref, fadeClass } = useFadeIn();
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  const renderCard = (cred: Credential) => (
    <article
      key={cred.id}
      className="group flex flex-col p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all hover:border-[var(--accent-border)] relative overflow-hidden"
    >
      {/* Top right subtle medal icon background */}
      <div className="absolute -top-4 -right-4 opacity-10">
        <Award className="w-24 h-24 text-[var(--text)]" />
      </div>

      <div className="mb-4">
        <span className="inline-flex p-2 rounded-lg bg-[var(--code-bg)] mb-4">
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
          <h3 className="text-lg font-semibold text-[var(--text-h)] leading-tight">
            {cred.title}
          </h3>
          <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
            {cred.timestamp}
          </span>
        </div>
        <p className="text-xs text-[var(--text)] mb-1">{cred.institution}</p>
        <p className="text-xs text-[var(--text)] opacity-90">{cred.date}</p>
      </div>

      <div className="mt-auto pt-4 flex flex-col gap-4">
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
        <button
          onClick={() => setSelectedCred(cred)}
          className="text-left text-xs font-bold text-[var(--accent)] tracking-wider uppercase hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          VIEW VERIFICATION <span aria-hidden="true">&gt;</span>
        </button>
      </div>
    </article>
  );

  return (
    <section id="credentials" className="py-12 space-y-16 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        {/* Awards Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">
              Awards & Honors
            </h2>
            <p className="text-sm text-[var(--text)]">
              A record of competitive achievements and academic excellence.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {awardsData.map(renderCard)}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">
              Professional Certifications
            </h2>
            <p className="text-sm text-[var(--text)]">
              Formal verification of specialized technical skills.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificationsData.map(renderCard)}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {selectedCred && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setSelectedCred(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedCred.imageUrl ? (
              <img
                src={selectedCred.imageUrl}
                alt={`Verification for ${selectedCred.title}`}
                className="max-w-full h-auto object-contain shadow-2xl max-h-[90vh] rounded-md"
              />
            ) : (
              <div className="w-full max-w-2xl h-64 flex items-center justify-center bg-[var(--bg)] rounded-xl border border-[var(--border)] text-[var(--text)] opacity-50">
                Image verification not available
              </div>
            )}

            {/* Close button that floats on top for convenience */}
            <button
              onClick={() => setSelectedCred(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
