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
    expect(screen.getByText('ITlympics 2024')).toBeInTheDocument()
    expect(screen.getByText('ITlympics 2025')).toBeInTheDocument()
    expect(screen.getByText('14th IT Skills Olympics')).toBeInTheDocument()
  })

  it('renders View Verification buttons', () => {
    expect(screen.getAllByText(/VIEW VERIFICATION/)).toHaveLength(7)
  })
})
