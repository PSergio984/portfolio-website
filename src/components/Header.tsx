import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";

const navigationItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

const navigationSectionIds = navigationItems.map((item) => item.id);

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const activeSection = useActiveSection(navigationSectionIds);

  const linkClassName = (id: string) =>
    `text-sm transition-colors ${
      activeSection === id
        ? "text-[var(--accent)] font-semibold"
        : "text-[var(--text)] hover:text-[var(--accent)]"
    }`;

  return (
    <header className="border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-sm bg-[var(--bg)]/90">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span aria-hidden="true" />

        <nav className="flex items-center gap-4 text-xs lg:text-sm">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${linkClassName(item.id)} whitespace-nowrap`}
              title={item.label}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}

          <button
            id="theme-toggle"
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] transition-colors text-[var(--text)]"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
