import { render, screen } from '@testing-library/react'
import { Credentials } from './Credentials'

describe('Credentials', () => {
  beforeEach(() => {
    render(<Credentials />)
  })

  it('renders the credentials section', () => {
    expect(document.querySelector('#credentials')).toBeInTheDocument()
  })

  it('renders all credential titles', () => {
    expect(screen.getByText('ITlympics 2026')).toBeInTheDocument()
    expect(screen.getByText('ITlympics 2025')).toBeInTheDocument()
    expect(screen.getByText('14th National IT Skills Olympics')).toBeInTheDocument()
    expect(screen.getByText('Global Cyber Skills Benchmark')).toBeInTheDocument()
  })

  it('renders credential timestamps', () => {
    expect(screen.getAllByText('[MAR 2026]')[0]).toBeInTheDocument()
    expect(screen.getByText('[APR 2025]')).toBeInTheDocument()
    expect(screen.getByText('[NOV 2025]')).toBeInTheDocument()
    expect(screen.getByText('[MAY 2026]')).toBeInTheDocument()
    expect(screen.getByText('[JAN 2026]')).toBeInTheDocument()
  })

  it('renders View Verification buttons', () => {
    expect(screen.getAllByText(/VIEW VERIFICATION/)).toHaveLength(10)
  })
})
