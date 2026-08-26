import { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles, Cpu } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';
import { caseStudies, type CaseStudy } from '../data/caseStudies';
import { CaseStudyModal } from './CaseStudyModal';
import { GitHubIcon } from './icons';

export function Projects() {
  const { ref, fadeClass } = useFadeIn();
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  // Sync with URL hash for deep linking (supporting plv-elib and ceit-library aliases)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#case-study/')) {
        const id = hash.replace('#case-study/', '');
        const found = caseStudies.find(
          (c) => c.id === id || (id === 'plv-elib' && c.id === 'ceit-library') || (id === 'ceit-library' && c.id === 'plv-elib')
        );
        if (found) {
          setSelectedStudy(found);
        }
      } else {
        setSelectedStudy(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openStudy = (study: CaseStudy) => {
    setSelectedStudy(study);
    if (window.location.hash !== `#case-study/${study.id}`) {
      window.history.pushState(null, '', `#case-study/${study.id}`);
    }
  };

  const closeStudy = () => {
    setSelectedStudy(null);
    if (window.location.hash.startsWith('#case-study/')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <section id="projects" aria-label="Featured Projects" className="py-8 sm:py-10 overflow-hidden w-full">
      <div ref={ref} className={`${fadeClass} w-full`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-md bg-[var(--accent-bg)] border border-[var(--accent-border)] inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Featured Systems</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-h)]">Featured Case Studies</h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
            Production full-stack & AI architectures with verified test benchmarks and decision trade-offs.
          </p>
        </div>

        {/* Compact Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
          {caseStudies.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent-border)] rounded-2xl p-4 sm:p-6 transition-all duration-200 shadow-[var(--shadow-card)] hover:shadow-lg w-full min-w-0 max-w-full overflow-hidden"
            >
              <div className="min-w-0 w-full">
                {/* Top Image Preview Button */}
                <button
                  type="button"
                  onClick={() => openStudy(project)}
                  aria-label={`Open case study for ${project.title}`}
                  className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden relative cursor-pointer mb-4 border border-[var(--border)] group-hover:border-[var(--accent-border)] transition-colors shadow-inner block text-left focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </button>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-[var(--text-muted)] font-medium">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-h)] mb-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => openStudy(project)}
                    aria-label={`Read case study: ${project.title}`}
                    className="w-full text-left group-hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center justify-between min-w-0 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded"
                  >
                    <span className="truncate pr-2">{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                  </button>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed line-clamp-3 mb-4">
                  {project.summary}
                </p>

                {/* High-Impact Architecture & AI Capabilities Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 mb-4 shadow-inner min-w-0">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="text-left sm:text-center min-w-0">
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate font-semibold uppercase tracking-wider">
                        {h.label}
                      </div>
                      <div className="text-xs font-bold text-violet-700 dark:text-violet-400 font-mono mt-0.5 leading-snug break-words">
                        {h.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2 flex-wrap min-w-0">
                <button
                  type="button"
                  onClick={() => openStudy(project)}
                  className="text-xs font-bold text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] inline-flex items-center gap-1 transition-colors"
                      title="Live System Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] inline-flex items-center gap-1 transition-colors"
                      title="Main GitHub Repository"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                  {project.links.sidecarGithub && (
                    <a
                      href={project.links.sidecarGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-violet-700 dark:text-violet-400 hover:underline inline-flex items-center gap-1 transition-colors"
                      title="FastAPI AI Sidecar Repository"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Sidecar</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal study={selectedStudy} onClose={closeStudy} />
    </section>
  );
}
