import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';

const navigationItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

const navigationSectionIds = navigationItems.map((item) => item.id);

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const activeSection = useActiveSection(navigationSectionIds);

  const linkClassName = (id: string) =>
    `text-xs sm:text-sm font-medium transition-colors px-2 py-1 rounded-md ${
      activeSection === id
        ? 'text-violet-700 dark:text-violet-400 font-bold bg-violet-50 dark:bg-violet-950/50'
        : 'text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400'
    }`;

  return (
    <header className="border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/90 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        <a
          href="#about"
          className="text-xs sm:text-sm font-mono font-bold text-[var(--text-h)] tracking-wider shrink-0 hover:text-violet-600 transition-colors"
        >
          ERIC.AI
        </a>

        <div className="flex items-center gap-1 sm:gap-2 min-w-0 overflow-x-auto scrollbar-none py-1">
          <nav className="flex items-center gap-0.5 sm:gap-1.5" aria-label="Main Navigation">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${linkClassName(item.id)} whitespace-nowrap shrink-0`}
                title={item.label}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            id="theme-toggle"
            type="button"
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] transition-colors text-[var(--text)] cursor-pointer shrink-0 ml-1"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
}
