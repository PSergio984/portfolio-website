import { useEffect, useRef } from 'react';

/**
 * Moves focus into an active modal, traps Tab within it, and restores
 * focus to the previously focused element when it closes.
 * Attach the returned ref to the dialog container (with tabIndex={-1}).
 */
export function useModalFocus<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    ref.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !ref.current) return;
      const focusables = Array.from(
        ref.current.querySelectorAll<HTMLElement>(
          'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.getClientRects().length > 0);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;
      if (!ref.current.contains(current) || current === ref.current) {
        (e.shiftKey ? last : first).focus();
        e.preventDefault();
      } else if (e.shiftKey && current === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && current === last) {
        first.focus();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [active]);

  return ref;
}
