import { Mail, ArrowRight, FileText } from "lucide-react";
import { useFadeIn } from "../hooks/useFadeIn";

// Inline SVGs for brand icons not present in lucide-react
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Contact() {
  const { ref, fadeClass } = useFadeIn();

  return (
    <section
      id="contact"
      aria-label="Contact and Links"
      className="py-16 md:py-24 overflow-hidden"
    >
      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center md:items-start justify-between gap-10 ${fadeClass}`}
      >
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-h)] tracking-tight mb-4">
            Let's build something secure.
          </h2>
          <p className="text-[var(--text)] leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            Currently open for new opportunities. Whether you have a question or
            just want to say hi, my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--text-h)] text-[var(--bg)] font-semibold hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              Say Hello
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--text-h)] font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-[200px]">
          <a
            href="https://github.com/PSergio984"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-xl border border-[var(--border)] hover:border-[var(--text-h)] transition-colors bg-[var(--bg)]"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-[var(--text-h)]">
              <GitHubIcon className="w-5 h-5 text-[var(--text)] group-hover:text-[var(--text-h)] transition-colors" />
              GitHub
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--text)] group-hover:text-[var(--text-h)] group-hover:-rotate-45 transition-all" />
          </a>
          <a
            href="https://www.linkedin.com/in/eric-gabriel-manabat-554697204/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-xl border border-[var(--border)] hover:border-[#0a66c2] transition-colors bg-[var(--bg)]"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-[var(--text-h)]">
              <LinkedInIcon className="w-5 h-5 text-[var(--text)] group-hover:text-[#0a66c2] transition-colors" />
              LinkedIn
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--text)] group-hover:text-[#0a66c2] group-hover:-rotate-45 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
}
