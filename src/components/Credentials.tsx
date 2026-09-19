import {
  Award,
  ShieldCheck,
  BookOpen,
  Users,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Cloud,
  GraduationCap,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { credentialsData, type Credential, type CredentialTopic } from '../data/credentials';
import { VerificationModal, type VerificationItem } from './VerificationModal';

export { VerificationModal, type VerificationItem };

interface TopicConfig {
  label: string;
  badgeLabel: string;
  icon: typeof Cpu;
}

const TOPIC_CONFIG: Record<CredentialTopic, TopicConfig> = {
  ai: {
    label: 'AI & Machine Learning',
    badgeLabel: 'AI & ML',
    icon: Cpu,
  },
  security: {
    label: 'Cybersecurity',
    badgeLabel: 'Cybersecurity',
    icon: ShieldCheck,
  },
  cloud: {
    label: 'Cloud & DevOps',
    badgeLabel: 'Cloud & DevOps',
    icon: Cloud,
  },
  academic: {
    label: 'Academic & Honors',
    badgeLabel: 'Academic & Honors',
    icon: GraduationCap,
  },
};

function matchesCredentialFilters(cred: Credential, category: string, topic: string): boolean {
  const matchesCategory = category === 'all' || cred.category === category;
  const matchesTopic = topic === 'all' || cred.topic === topic;
  return matchesCategory && matchesTopic;
}

// Unified Compact Credentials Component with Tabbed & Topic Filtering
export function Credentials() {
  const { ref, fadeClass } = useFadeIn();
  const [activeTab, setActiveTab] = useState<
    'all' | 'awards' | 'certifications' | 'programs' | 'seminars'
  >('all');
  const [activeTopic, setActiveTopic] = useState<'all' | CredentialTopic>('all');
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

  const topicFilters: Array<{
    id: 'all' | CredentialTopic;
    label: string;
    icon: typeof Sparkles;
  }> = [
    { id: 'all', label: 'All Topics', icon: Sparkles },
    ...(Object.entries(TOPIC_CONFIG) as [CredentialTopic, TopicConfig][]).map(([id, config]) => ({
      id,
      label: config.label,
      icon: config.icon,
    })),
  ];

  const filteredCredentials = credentialsData.filter((c) =>
    matchesCredentialFilters(c, activeTab, activeTopic),
  );

  const getTopicCount = (topicId: 'all' | CredentialTopic) => {
    return credentialsData.filter((c) => matchesCredentialFilters(c, activeTab, topicId)).length;
  };

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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none border-b border-[var(--border)]">
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

        {/* Topic Sub-Filters */}
        <div
          role="group"
          aria-label="Filter credentials by topic"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none"
        >
          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Layers className="w-3 h-3 text-[var(--accent-text)]" />
            <span>Topic:</span>
          </span>
          {topicFilters.map((topic) => {
            const Icon = topic.icon;
            const count = getTopicCount(topic.id);
            const isActive = activeTopic === topic.id;
            const isDisabled = count === 0 && !isActive;

            return (
              <button
                type="button"
                key={topic.id}
                disabled={isDisabled}
                aria-pressed={isActive}
                aria-label={`${topic.label} (${count} items)`}
                onClick={() => {
                  setActiveTopic(activeTopic === topic.id ? 'all' : topic.id);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium inline-flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                    : isDisabled
                      ? 'opacity-35 cursor-not-allowed bg-transparent border border-dashed border-[var(--border)] text-[var(--text-muted)]'
                      : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-h)] hover:bg-[var(--card-hover)] border border-[var(--border)]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{topic.label}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-[var(--text-muted)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Credentials Grid or Empty State */}
        {visibleCredentials.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] mb-4">
            <p className="text-sm font-bold text-[var(--text-h)] mb-1">
              No credentials found for this topic under{' '}
              {tabs.find((t) => t.id === activeTab)?.label}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-4 max-w-sm mx-auto">
              Try choosing a different topic or resetting to view all records in this category.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTopic('all');
                setVisibleCount(INITIAL_COUNT);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--accent-text)] bg-[var(--accent-bg)] hover:bg-[var(--card-hover)] border border-[var(--accent-border)] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Topic Filter</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleCredentials.map((cred) => (
              <div
                key={cred.title}
                className="p-5 rounded-2xl bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all duration-200 shadow-[var(--shadow-card)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
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
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md font-medium bg-[var(--code-bg)] text-[var(--text-muted)] border border-[var(--border)]">
                        {TOPIC_CONFIG[cred.topic].badgeLabel}
                      </span>
                    </div>
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
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {cred.date}
                  </span>

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
        )}

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
