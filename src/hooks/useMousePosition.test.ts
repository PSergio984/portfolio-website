import { renderHook, act } from '@testing-library/react';
import { useMousePosition } from './useMousePosition';

describe('useMousePosition', () => {
  it('should return initial position (0, 0)', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
  });

  it('should update position on mousemove', () => {
    const { result } = renderHook(() => useMousePosition());
    
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
    });

    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(200);
  });
});
