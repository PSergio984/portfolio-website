import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'

describe('Projects', () => {
  beforeEach(() => {
    render(<Projects />)
  })

  it('renders the projects section', () => {
    expect(document.querySelector('#projects')).toBeInTheDocument()
  })

  it('renders all five project cards', () => {
    expect(screen.getByRole('heading', { level: 3, name: 'Agos' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Task-Buddy' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'PLV CEIT Library' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Survey System' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Datus-Ctf-Writeups' })).toBeInTheDocument()
  })

  it('renders View Details links', () => {
    expect(screen.getAllByText(/View Details/)).toHaveLength(5)
  })
})
