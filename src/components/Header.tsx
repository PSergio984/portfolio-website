import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-sm bg-[var(--bg)]/90">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-lg text-[var(--text-h)] tracking-tight">
          Eric Gabriel
        </span>

        <nav className="flex items-center gap-6">
          <a href="#about" className="text-sm hover:text-[var(--accent)] transition-colors">
            About
          </a>
          <a href="#credentials" className="text-sm hover:text-[var(--accent)] transition-colors">
            Credentials
          </a>
          <a href="#projects" className="text-sm hover:text-[var(--accent)] transition-colors">
            Projects
          </a>
          <a href="#contact" className="text-sm hover:text-[var(--accent)] transition-colors">
            Contact
          </a>

          <button
            id="theme-toggle"
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] transition-colors text-[var(--text)]"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </div>
    </header>
  )
}
