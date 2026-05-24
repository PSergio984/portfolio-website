import { render } from '@testing-library/react';
import { CustomCursor } from './CustomCursor';
import { describe, it, expect, vi } from 'vitest';

// Mock useMousePosition
vi.mock('../hooks/useMousePosition', () => ({
  useMousePosition: () => ({ x: 100, y: 100 }),
}));

describe('CustomCursor', () => {
  it('renders both dot and ring', () => {
    const { container } = render(<CustomCursor />);
    // Need to handle visibility in test (the component only renders if visible)
    // For testing, let's assume we trigger visibility or mock state.
    const dot = container.querySelector('.cursor-dot');
    const ring = container.querySelector('.cursor-ring');
    expect(dot).toBeInTheDocument();
    expect(ring).toBeInTheDocument();
  });
});
