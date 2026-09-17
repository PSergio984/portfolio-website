import {
  Award,
  ShieldCheck,
  BookOpen,
  Users,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { credentialsData, type Credential } from '../data/credentials';
import { VerificationModal, type VerificationItem } from './VerificationModal';

export { VerificationModal, type VerificationItem };

// Unified Compact Credentials Component with Tabbed Filtering
export function Credentials() {
  const { ref, fadeClass } = useFadeIn();
  const [activeTab, setActiveTab] = useState<
    'all' | 'awards' | 'certifications' | 'programs' | 'seminars'
  >('all');
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);
  const INITIAL_COUNT = 6;
  const BATCH_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

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
    activeTab === 'all' ? credentialsData : credentialsData.filter((c) => c.category === activeTab);

  const visibleCredentials = filteredCredentials.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredCredentials.length - visibleCount);
  const nextBatchCount = Math.min(BATCH_SIZE, remainingCount);
  const canShowMore = remainingCount > 0;
  const canShowLess = visibleCount > INITIAL_COUNT;

  return (
    <section
      id="credentials"
      aria-label="Credentials and Certifications"
      className="py-10 overflow-hidden"
    >
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
            Verified academic excellence, cybersecurity certifications, CTF awards, and continuous
            engineering cohorts.
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
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  setVisibleCount(INITIAL_COUNT);
                }}
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
          {visibleCredentials.map((cred) => (
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
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    {cred.timestamp}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-h)] mb-1 leading-snug">
                  {cred.title}
                </h3>
                <div className="text-xs font-medium text-[var(--accent-text)] mb-2">
                  {cred.institution}
                </div>
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
                    className="text-xs font-semibold text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 cursor-pointer bg-[var(--accent-bg)] hover:bg-[var(--card-hover)] px-3 py-1.5 rounded-lg transition-colors border border-[var(--accent-border)] shadow-2xs"
                  >
                    <span>Proof</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : cred.profileUrl ? (
                  <a
                    href={cred.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 bg-[var(--accent-bg)] hover:bg-[var(--card-hover)] px-3 py-1.5 rounded-lg transition-colors border border-[var(--accent-border)] shadow-2xs"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Progressive Disclosure (Batch Show More / Show Less) */}
        {(canShowMore || canShowLess) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {canShowMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + BATCH_SIZE)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-h)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all shadow-sm cursor-pointer"
              >
                <span>
                  Show {nextBatchCount} More ({remainingCount} remaining)
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {canShowLess && (
              <button
                type="button"
                onClick={() => setVisibleCount(INITIAL_COUNT)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--text-h)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all shadow-sm cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Show Less</span>
              </button>
            )}
          </div>
        )}
      </div>

      <VerificationModal item={selectedCred} onClose={() => setSelectedCred(null)} />
    </section>
  );
}
