export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text)]">
        <p>
          © {new Date().getFullYear()} Eric Gabriel Manabat. All rights
          reserved.
        </p>

        {/* Performance Stamp */}
        <div className="flex items-center gap-4 font-mono text-[10px] opacity-85">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            BUILD: v1.0.0
          </span>
          <span>TTI: &lt; 1.2s</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/PSergio984"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-h)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/eric-gabriel-manabat-554697204/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-h)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
