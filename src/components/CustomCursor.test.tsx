import { render, fireEvent } from '@testing-library/react';
import { CustomCursor } from './CustomCursor';
import { describe, it, expect, vi } from 'vitest';

// Mock useMousePosition
vi.mock('../hooks/useMousePosition', () => ({
  useMousePosition: () => ({ x: 100, y: 100 }),
}));

describe('CustomCursor', () => {
  it('renders both dot and ring after mouse enter', () => {
    const { container } = render(<CustomCursor />);
    
    // Initially should be null because isVisible is false
    expect(container.querySelector('.cursor-dot')).not.toBeInTheDocument();

    // Trigger mouseenter on document
    fireEvent.mouseEnter(document);

    const dot = container.querySelector('.cursor-dot');
    const ring = container.querySelector('.cursor-ring');
    expect(dot).toBeInTheDocument();
    expect(ring).toBeInTheDocument();
  });
});
