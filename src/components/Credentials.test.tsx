import { render, screen } from '@testing-library/react'
import { Awards, Certifications, Seminars } from './Credentials'

describe('Credentials Components', () => {
  beforeEach(() => {
    render(
      <>
        <Awards />
        <Certifications />
        <Seminars />
      </>
    )
  })

  it('renders the individual sections', () => {
    expect(document.querySelector('#awards')).toBeInTheDocument()
    expect(document.querySelector('#certifications')).toBeInTheDocument()
    expect(document.querySelector('#seminars')).toBeInTheDocument()
  })

  it('renders all credential titles', () => {
    expect(screen.getByText('Silver Medal: Cybersecurity CTF (ITlympics)')).toBeInTheDocument()
    expect(screen.getByText('Gold Medal: General IT Quiz Bee (ITlympics)')).toBeInTheDocument()
    expect(screen.getByText('National Representative: Cybersecurity Quiz Bee')).toBeInTheDocument()
    expect(screen.getByText('Global Cyber Skills Benchmark')).toBeInTheDocument()
  })

  it('renders credential timestamps', () => {
    expect(screen.getAllByText('[MAR 2026]')[0]).toBeInTheDocument()
    expect(screen.getByText('[APR 2025]')).toBeInTheDocument()
    expect(screen.getByText('[NOV 2025]')).toBeInTheDocument()
    expect(screen.getByText('[2026]')).toBeInTheDocument()
    expect(screen.getByText('[JAN 2026]')).toBeInTheDocument()
  })

  it('renders View Verification buttons', () => {
    expect(screen.getAllByText(/VIEW VERIFICATION/)).toHaveLength(9)
    expect(screen.getAllByText(/VIEW CERTIFICATE/)).toHaveLength(3)
  })
})
