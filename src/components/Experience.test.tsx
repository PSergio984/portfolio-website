import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience', () => {
  beforeEach(() => {
    render(<Experience />);
  });

  it('renders the experience section', () => {
    expect(document.querySelector('#experience')).toBeInTheDocument();
  });

  it('renders both roles with companies and timestamps', () => {
    expect(screen.getByText('Full-Stack AI Engineer Intern')).toBeInTheDocument();
    expect(screen.getByText('FlyRank AI')).toBeInTheDocument();
    expect(screen.getAllByText('[JUN 2026 – PRESENT]')[0]).toBeInTheDocument();

    expect(screen.getByText('Full Stack Software Engineering Intern — Team Lead')).toBeInTheDocument();
    expect(screen.getByText('Nexvision Innovations Inc.')).toBeInTheDocument();
  });

  it('summarizes the work and NDA context accurately', () => {
    expect(screen.getByText(/mission-critical enterprise HRIS features under NDA/i)).toBeInTheDocument();
  });

  it('renders accomplishment bullets from reports including DOLE labor audit and Google XYZ metrics', () => {
    expect(screen.getByText(/Department of Labor and Employment \(DOLE\) statutory standards/i)).toBeInTheDocument();
    expect(screen.getByText(/progressive SSS\/WISP, PhilHealth, and Pag-IBIG/i)).toBeInTheDocument();
    expect(screen.getByText(/10 PM – 6 AM night differentials/i)).toBeInTheDocument();
    expect(screen.getByText(/FastAPI AI sidecar microservice/i)).toBeInTheDocument();
    expect(screen.getByText(/increasing retrieval accuracy from 81\.8% to 86\.4% Top-1/i)).toBeInTheDocument();
  });
});
