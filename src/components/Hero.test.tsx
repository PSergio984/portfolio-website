import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

// Mock the hero.png import
vi.mock('../assets/hero.png', () => ({ default: 'hero.png' }))

describe('Hero', () => {
  beforeEach(() => {
    render(<Hero />)
  })

  it('renders the about section', () => {
    expect(document.querySelector('#about')).toBeInTheDocument()
  })

  it('displays name', () => {
    expect(screen.getByRole('heading', { level: 1, name: /eric gabriel manabat/i })).toBeInTheDocument()
  })

  it('displays the headline subtitle', () => {
    expect(screen.getByText(/backend developer/i)).toBeInTheDocument()
  })

  it('displays the hero image', () => {
    expect(screen.getByAltText(/sergio.*portrait/i)).toBeInTheDocument()
  })

  it('displays awards and certifications headers', () => {
    expect(screen.getByText(/awards & honors/i)).toBeInTheDocument()
    expect(screen.getByText(/certifications/i)).toBeInTheDocument()
  })

  it('displays awards and certifications content', () => {
    expect(screen.getByText(/HackTheBox/i)).toBeInTheDocument()
    expect(screen.getByText(/Google Cybersecurity Professional Certificate/i)).toBeInTheDocument()
  })
})
