import { useEffect, useState } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.closest === 'function' && target.closest('a, button, input, [role="button"]')) {
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Dot */}
      <div
        className="cursor-dot fixed w-1.5 h-1.5 bg-[var(--accent)] rounded-full transition-transform duration-75 ease-out"
        style={{ transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)` }}
      />
      {/* Ring */}
      <div
        className={`cursor-ring fixed rounded-full border border-[var(--accent)] transition-all duration-300 ease-out ${
          isHovering ? 'w-12 h-12 opacity-50' : 'w-8 h-8 opacity-30'
        }`}
        style={{ transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)` }}
      />
    </div>
  );
}
