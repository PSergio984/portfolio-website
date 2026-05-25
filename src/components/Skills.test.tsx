import { render, screen } from '@testing-library/react'
import { Skills } from './Skills'

describe('Skills', () => {
  beforeEach(() => {
    render(<Skills />)
  })

  it('renders the skills section', () => {
    expect(document.querySelector('#skills')).toBeInTheDocument()
  })

  it('renders all skill categories', () => {
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Backend & Security')).toBeInTheDocument()
    expect(screen.getByText('Frontend & UI/UX')).toBeInTheDocument()
    expect(screen.getByText('Database')).toBeInTheDocument()
    expect(screen.getByText('DevOps & Cloud')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
  })

  it('renders specific skills', () => {
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Burp Suite')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
})
