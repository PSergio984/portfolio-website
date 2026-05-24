/**
 * useTheme — synchronizes dark/light theme with localStorage and
 * the OS prefers-color-scheme media query.
 *
 * Theme is applied by toggling the 'dark' class on <html>.
 * FOUC is prevented by a blocking inline script in index.html.
 */

import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'

// ── External store ──────────────────────────────────────────────────────────

const subscribers = new Set<() => void>()

function notify() {
  subscribers.forEach((fn) => fn())
}

// Listen for OS theme changes and cross-tab storage events
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', notify)
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') notify()
  })
}

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // localStorage unavailable (SSR / private mode)
  }
  return 'system'
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme)
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

// ── Public API ──────────────────────────────────────────────────────────────

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // ignore
  }
  applyTheme(theme)
  notify()
}

export function toggleTheme() {
  const current = getStoredTheme()
  const resolved = resolveTheme(current)
  setTheme(resolved === 'dark' ? 'light' : 'dark')
}

function subscribe(callback: () => void) {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

function getSnapshot(): Theme {
  return getStoredTheme()
}

// ── React hook ──────────────────────────────────────────────────────────────

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot)
  const resolvedTheme = resolveTheme(theme)
  const isDark = resolvedTheme === 'dark'

  return { theme, resolvedTheme, isDark, setTheme, toggleTheme }
}
