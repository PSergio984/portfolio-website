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
    expect(screen.getByAltText(/eric gabriel manabat.*portrait/i)).toBeInTheDocument()
  })

  it('displays awards and certifications headers', () => {
    expect(screen.getByText(/awards & honors/i)).toBeInTheDocument()
    expect(screen.getByText(/certifications/i)).toBeInTheDocument()
  })

  it('displays awards and certifications content', () => {
    // Check for specific keywords in awards
    expect(screen.getByText(/HackTheBox/i)).toBeInTheDocument()
    expect(screen.getByText(/UGA GoldRush/i)).toBeInTheDocument()
    expect(screen.getByText(/ITlympics/i)).toBeInTheDocument()
    expect(screen.getByText(/Magna Cum Laude/i)).toBeInTheDocument()

    // Check for specific keywords in certifications
    expect(screen.getByText(/Google Cybersecurity Professional Certificate/i)).toBeInTheDocument()
    expect(screen.getByText(/TESDA NC3/i)).toBeInTheDocument()
  })
})
