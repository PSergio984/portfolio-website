export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-700 dark:text-gray-300">
        <p>
          © {new Date().getFullYear()} Eric Gabriel Manabat. All rights
          reserved.
        </p>

        {/* Performance Stamp */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-700 dark:text-gray-300">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          BUILD: v1.0.0
        </div>
      </div>
    </footer>
  );
}
