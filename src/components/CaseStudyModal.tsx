import { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  GitBranch,
  Cpu,
  Database,
  CheckCircle2,
  AlertTriangle,
  Layers,
  BookOpen,
  Sparkles,
  Terminal,
  LayoutList,
} from 'lucide-react';
import type { CaseStudy } from '../data/caseStudies';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

const tabs = [
  { id: 'all', label: 'All Sections', icon: LayoutList },
  { id: 'overview', label: 'Overview', icon: Sparkles },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'ai-rag', label: 'AI & RAG', icon: Cpu },
  { id: 'decisions', label: 'Decisions', icon: Database },
  { id: 'results', label: 'Results', icon: CheckCircle2 },
] as const;

export function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('all');
  const [showAscii, setShowAscii] = useState(false);

  useEffect(() => {
    if (!study) return;

    // Cache prior overflow value and lock body scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow || 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  const availableTabs = tabs.filter((tab) => tab.id !== 'ai-rag' || !!study.aiIntegration);

  const showOverview = activeTab === 'all' || activeTab === 'overview';
  const showArchitecture = activeTab === 'all' || activeTab === 'architecture';
  const showAiRag = Boolean(study.aiIntegration && (activeTab === 'all' || activeTab === 'ai-rag'));
  const showDecisions = activeTab === 'all' || activeTab === 'decisions';
  const showResults = activeTab === 'all' || activeTab === 'results';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative w-full max-w-6xl h-[92vh] bg-white dark:bg-[#090d16] border border-slate-300 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row cursor-default text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Close Button */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-full transition-colors backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* LEFT SIDEBAR (Desktop: Navigation & Meta / Mobile: Collapsible Header) */}
        <div className="w-full md:w-80 md:min-w-[320px] bg-slate-50 dark:bg-[#0b101d] border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex flex-col justify-between shrink-0 overflow-y-auto max-h-[35vh] md:max-h-none">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="text-[10px] font-mono font-bold text-violet-700 dark:text-violet-400 uppercase tracking-widest mb-1">
                Case Study
              </div>
              <h2 id="case-study-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {study.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {study.tagline}
              </p>
            </div>

            {/* High-Impact Capabilities Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              {study.highlights.map((h) => (
                <div key={h.label} className="bg-white dark:bg-slate-900/90 rounded-lg p-2.5 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate uppercase font-semibold">{h.label}</div>
                  <div className="text-xs font-bold text-violet-700 dark:text-violet-400 font-mono mt-0.5">{h.value}</div>
                </div>
              ))}
            </div>

            {/* Desktop Interactive Navigation Links */}
            <nav className="hidden md:block space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800" aria-label="Case Study Sections">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                Filter Sections
              </div>
              {availableTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border-l-2 border-violet-600 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/5 font-medium'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Action Links */}
          <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-row md:flex-col gap-2 mt-3 sm:mt-4 flex-wrap">
            {study.links.demo && (
              <a
                href={study.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {study.links.github && (
              <a
                href={study.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-300 dark:border-slate-700 shadow-2xs"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
            {study.links.sidecarGithub && (
              <a
                href={study.links.sidecarGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 dark:hover:bg-violet-900/60 text-violet-800 dark:text-violet-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-violet-200 dark:border-violet-800/50 shadow-2xs"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Sidecar Repo</span>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Tabbed Card-Based Technical Deep Dive */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col focus:outline-none min-w-0">
          {/* Mobile Segmented Tab Bar */}
          <div className="md:hidden flex items-center gap-1 overflow-x-auto pb-2 mb-4 border-b border-slate-200 dark:border-slate-800 scrollbar-none shrink-0">
            {availableTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-violet-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {showOverview && (
            <div className="space-y-6">
              {/* Hero Banner */}
              <div className="space-y-3">
                <div className="aspect-[21/9] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 relative shadow-inner">
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem & Context */}
              <section className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <h3>Problem & Context</h3>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {study.problem.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </section>

              {/* My Role & Ownership */}
              <section className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                  <h3>My Engineering Ownership</h3>
                </div>
                <ul className="space-y-2">
                  {study.contribution.map((c) => (
                    <li key={c.slice(0, 32)} className="flex gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="text-violet-600 dark:text-violet-400 font-mono font-bold shrink-0">&gt;</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Solution Summary */}
              <section className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <h3>Solution Overview</h3>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {study.solution.map((s) => (
                    <p key={s.slice(0, 32)}>{s}</p>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: SYSTEM ARCHITECTURE */}
          {showArchitecture && (
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <section className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <h3>System Architecture & Topology</h3>
                  </div>

                  {study.architecture.diagram && (
                    <button
                      type="button"
                      onClick={() => setShowAscii(!showAscii)}
                      className="text-xs font-mono font-semibold text-violet-700 dark:text-violet-400 hover:underline inline-flex items-center gap-1 cursor-pointer bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{showAscii ? 'Hide ASCII Diagram' : 'View ASCII Diagram'}</span>
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {study.architecture.summary}
                </p>

                {/* Collapsible ASCII Diagram for Desktop / Optional Mobile */}
                {study.architecture.diagram && showAscii && (
                  <pre className="p-3 sm:p-4 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 overflow-x-auto text-[10px] sm:text-[11px] font-mono leading-snug shadow-inner">
                    {study.architecture.diagram}
                  </pre>
                )}

                {/* Responsive Stack Breakdown Cards / Table */}
                <div className="space-y-2">
                  <div className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Full-Stack Layer Breakdown
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {study.architecture.stack.map((s) => (
                      <div key={s.layer} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono font-bold text-violet-700 dark:text-violet-400 uppercase">
                            {s.layer}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                            {s.tech}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {s.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: AI & RAG PIPELINE */}
          {study.aiIntegration && showAiRag && (
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <h3>AI & Search RAG Pipeline</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {study.aiIntegration.overview}
                </p>

                {study.aiIntegration.pipelineSteps && (
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="text-xs font-bold font-mono text-violet-700 dark:text-violet-400 uppercase tracking-wider">
                      Pipeline Execution Stages
                    </div>
                    <ul className="space-y-2">
                      {study.aiIntegration.pipelineSteps.map((step, i) => (
                        <li key={step.slice(0, 32)} className="flex gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="font-mono text-violet-600 dark:text-violet-400 font-bold shrink-0">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {study.aiIntegration.benchmarks && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Evaluation & Grounded Benchmarks
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {study.aiIntegration.benchmarks.map((b) => (
                        <div key={b.metric} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
                          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">{b.metric}</div>
                          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{b.value}</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400">{b.notes}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* TAB 4: TECHNICAL DECISIONS & CHALLENGES */}
          {showDecisions && (
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3>Technical Decisions & Trade-offs</h3>
                </div>
                <div className="space-y-3">
                  {study.decisions.map((d) => (
                    <div key={d.decision} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between flex-wrap gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{d.decision}</span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800/50 font-semibold">
                          Rejected: {d.alternative}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{d.rationale}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Rendered Challenges Section */}
              <section className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <h3>Engineering Challenges Overcome</h3>
                </div>
                <ul className="space-y-2">
                  {study.challenges.map((ch) => (
                    <li key={ch.slice(0, 32)} className="flex gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="text-amber-500 font-mono font-bold shrink-0">&bull;</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {/* TAB 5: RESULTS & LESSONS */}
          {showResults && (
            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3>Results & Automated Verification</h3>
                </div>
                <ul className="space-y-2">
                  {study.results.map((r) => (
                    <li key={r.slice(0, 32)} className="flex gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold shrink-0">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 pb-6">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <h3>Honest Retrospective & Future Roadmap</h3>
                </div>
                <ul className="space-y-2">
                  {study.lessons.map((l) => (
                    <li key={l.slice(0, 32)} className="flex gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold shrink-0">→</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
