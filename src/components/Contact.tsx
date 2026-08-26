import { useState } from 'react';
import { Mail, FileText } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';
import { ResumeModal } from './ResumeModal';
import { BootDevIcon, GitHubIcon, LinkedInIcon } from './icons';

export function Contact() {
  const { ref, fadeClass } = useFadeIn();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="contact" aria-label="Contact and Links" className="py-14 sm:py-20 md:py-24 overflow-hidden w-full">
      <div ref={ref} className={`max-w-2xl mx-auto text-center ${fadeClass}`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-h)] tracking-tight mb-3">
          Let's build intelligent, production-ready systems.
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed mb-8 max-w-md mx-auto">
          Currently open for Full-Stack & AI Engineering roles. Whether you have an opportunity to discuss
          or want to collaborate on a project, my inbox is always open.
        </p>

        <div className="flex flex-wrap items-center gap-3 justify-center">
          <a
            href="mailto:eric.manabatseam@gmail.com"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me</span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              setIsResumeOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-h)] font-semibold text-xs sm:text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </a>

          <a
            href="https://github.com/PSergio984"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-h)] font-semibold text-xs sm:text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.boot.dev/u/eric984"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-h)] font-semibold text-xs sm:text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs"
          >
            <BootDevIcon className="w-4 h-4" />
            <span>Boot.dev</span>
          </a>

          <a
            href="https://www.linkedin.com/in/eric-gabriel-manabat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-h)] font-semibold text-xs sm:text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-xs"
          >
            <LinkedInIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
