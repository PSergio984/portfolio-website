import '@testing-library/jest-dom'

class IntersectionObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor() {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
