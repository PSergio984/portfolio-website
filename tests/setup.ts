import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

class MatchMediaMock {
  matches = false;
  media = "";
  onchange: ((event: MediaQueryListEvent) => void) | null = null;
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  addListener = vi.fn();
  removeListener = vi.fn();
  dispatchEvent = vi.fn(() => false);
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn(() => new MatchMediaMock()),
});
