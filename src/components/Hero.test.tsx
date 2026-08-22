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
    expect(screen.getAllByText(/full-stack developer/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/cybersecurity/i)[0]).toBeInTheDocument();
  });

  it('displays the what-i-do cards', () => {
    expect(screen.getAllByText('Full-Stack Development')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cybersecurity')[0]).toBeInTheDocument();
    expect(screen.getAllByText('CTF Competition')[0]).toBeInTheDocument();
  });

  it('displays the hero image', () => {
    expect(screen.getByAltText('Eric Gabriel Manabat')).toBeInTheDocument();
  });

  it('links out to professional platforms', () => {
    for (const label of ['GitHub', 'LinkedIn', 'TryHackMe', 'HackTheBox', 'HackerRank']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });
});
