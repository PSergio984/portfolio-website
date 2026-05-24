import { useEffect, useState } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible && typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Dot */}
      <div
        className="cursor-dot fixed w-1.5 h-1.5 bg-[var(--accent)] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{ left: `${x}px`, top: `${y}px` }}
      />
      {/* Ring */}
      <div
        className={`cursor-ring fixed rounded-full border border-[var(--accent)] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovering ? 'w-12 h-12 opacity-50' : 'w-8 h-8 opacity-30'
        }`}
        style={{ left: `${x}px`, top: `${y}px` }}
      />
    </div>
  );
}
