import { render, screen } from '@testing-library/react'
import { Projects } from './Projects'

describe('Projects', () => {
  beforeEach(() => {
    render(<Projects />)
  })

  it('renders the projects section', () => {
    expect(document.querySelector('#projects')).toBeInTheDocument()
  })

  it('renders all four project cards', () => {
    expect(screen.getByText('Agos')).toBeInTheDocument()
    expect(screen.getByText('PLV CEIT Library')).toBeInTheDocument()
    expect(screen.getByText('Survey System')).toBeInTheDocument()
    expect(screen.getByText('Datus-Ctf-Writeups')).toBeInTheDocument()
  })

  it('renders View Details links', () => {
    expect(screen.getAllByText(/View Details/)).toHaveLength(4)
  })
})
