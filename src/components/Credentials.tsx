import { Award, ShieldCheck, BookOpen, Users, X, ExternalLink, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { credentialsData, type Credential } from '../data/credentials';

// Fixed Responsive Verification Modal
export function VerificationModal({
  selectedCred,
  onClose,
}: {
  selectedCred: Credential | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!selectedCred) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCred, onClose]);

  if (!selectedCred) return null;
  const isPdf = selectedCred.imageUrl?.toLowerCase().endsWith('.pdf');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-cred-title"
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center cursor-default bg-white dark:bg-[#0b101d] p-4 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 px-1">
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate pr-4" id="modal-cred-title">
            {selectedCred.title}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-full transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            aria-label="Close proof preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {selectedCred.imageUrl ? (
          isPdf ? (
            <iframe
              src={selectedCred.imageUrl}
              title={`Verification for ${selectedCred.title}`}
              className="w-full h-[78vh] bg-white rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl"
            />
          ) : (
            <img
              src={selectedCred.imageUrl}
              alt={`Certificate proof for ${selectedCred.title}`}
              className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800"
            />
          )
        ) : (
          <div className="w-full max-w-md h-48 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
            Preview proof not available
          </div>
        )}
      </div>
    </div>
  );
}

// Unified Compact Credentials Component with Tabbed Filtering
export function Credentials() {
  const { ref, fadeClass } = useFadeIn();
  const [activeTab, setActiveTab] = useState<'all' | 'awards' | 'certifications' | 'programs' | 'seminars'>('all');
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  const tabs = [
    { id: 'all', label: 'All Credentials', icon: Sparkles, count: credentialsData.length },
    {
      id: 'awards',
      label: 'Honors & Awards',
      icon: Award,
      count: credentialsData.filter((c) => c.category === 'awards').length,
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: ShieldCheck,
      count: credentialsData.filter((c) => c.category === 'certifications').length,
    },
    {
      id: 'programs',
      label: 'Programs & Fellowships',
      icon: Users,
      count: credentialsData.filter((c) => c.category === 'programs').length,
    },
    {
      id: 'seminars',
      label: 'Seminars',
      icon: BookOpen,
      count: credentialsData.filter((c) => c.category === 'seminars').length,
    },
  ] as const;

  const filteredCredentials =
    activeTab === 'all'
      ? credentialsData
      : credentialsData.filter((c) => c.category === activeTab);

  return (
    <section id="credentials" aria-label="Credentials and Certifications" className="py-10 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <div className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold mb-1 px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)] w-fit">
              Verified Records
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-h)] mt-1.5">
              Honors, Certifications & Fellowships
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
            Verified academic excellence, cybersecurity certifications, CTF awards, and continuous engineering cohorts.
          </p>
        </div>

        {/* Tab Selection Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none border-b border-[var(--border)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-sm font-semibold'
                    : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-h)] hover:bg-[var(--card-hover)] border border-[var(--border)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-[var(--text-muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCredentials.map((cred) => (
            <div
              key={cred.title}
              className="p-5 rounded-2xl bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all duration-200 shadow-[var(--shadow-card)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-semibold ${
                      cred.category === 'awards'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60'
                        : cred.category === 'certifications'
                        ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border border-violet-300 dark:border-violet-800/60'
                        : cred.category === 'programs'
                        ? 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800/60'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {cred.category}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{cred.timestamp}</span>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-h)] mb-1 leading-snug">{cred.title}</h3>
                <div className="text-xs font-medium text-[var(--accent-text)] mb-2">{cred.institution}</div>
                {cred.award && (
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono mb-2">
                    {cred.award}
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">{cred.date}</span>

                {cred.imageUrl ? (
                  <button
                    type="button"
                    onClick={() => setSelectedCred(cred)}
                    className="text-xs font-bold text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 cursor-pointer bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/40 dark:hover:bg-violet-900/60 px-3 py-1.5 rounded-lg transition-colors border border-violet-200 dark:border-violet-800/50 shadow-2xs"
                  >
                    <span>Proof</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : cred.profileUrl ? (
                  <a
                    href={cred.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/40 dark:hover:bg-violet-900/60 px-3 py-1.5 rounded-lg transition-colors border border-violet-200 dark:border-violet-800/50 shadow-2xs"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <VerificationModal selectedCred={selectedCred} onClose={() => setSelectedCred(null)} />
    </section>
  );
}
