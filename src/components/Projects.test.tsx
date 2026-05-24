import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'

describe('Projects', () => {
  beforeEach(() => {
    render(<Projects />)
  })

  it('renders the projects section', () => {
    expect(document.querySelector('#projects')).toBeInTheDocument()
  })

  it('renders all three project cards', () => {
    expect(screen.getByText('PLV Cloud')).toBeInTheDocument()
    expect(screen.getByText('The Shadow Backend')).toBeInTheDocument()
    expect(screen.getByText('Security Lab Reports')).toBeInTheDocument()
  })

  it('renders View Details links', () => {
    expect(screen.getAllByText(/View Details/)).toHaveLength(3)
  })
})
