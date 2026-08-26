import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

// Mock the profile.png import
vi.mock('../assets/profile.png', () => ({ default: 'profile.png' }));

describe('Hero', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it('renders the about section', () => {
    expect(document.querySelector('#about')).toBeInTheDocument();
  });

  it('displays name', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: /eric gabriel manabat/i }),
    ).toBeInTheDocument();
  });

  it('displays the headline subtitle', () => {
    expect(screen.getAllByText(/full-stack ai engineer/i)[0]).toBeInTheDocument();
  });

  it('displays the what-i-do cards', () => {
    expect(screen.getByText('Full-Stack AI Engineering')).toBeInTheDocument();
    expect(screen.getByText('Secure Backend Architecture')).toBeInTheDocument();
    expect(screen.getByText('Cybersecurity & CTF Honors')).toBeInTheDocument();
  });

  it('displays the hero image', () => {
    expect(screen.getByAltText('Eric Gabriel Manabat')).toBeInTheDocument();
  });

  it('links out to professional platforms', () => {
    for (const label of ['GitHub', 'LinkedIn', 'Boot.dev', 'TryHackMe', 'HackTheBox', 'HackerRank']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });
});
