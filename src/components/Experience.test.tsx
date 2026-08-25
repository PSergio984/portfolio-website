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
    expect(screen.getByText('Backend AI Engineer — Intern')).toBeInTheDocument();
    expect(screen.getByText('Flyrank')).toBeInTheDocument();
    expect(screen.getByText('[JUL – AUG 2026]')).toBeInTheDocument();

    expect(screen.getByText('Software Engineering Intern — HRIS SWE Team')).toBeInTheDocument();
    expect(screen.getByText('Nexvision Innovations Inc.')).toBeInTheDocument();
    expect(screen.getByText('[JUN – SEP 2026]')).toBeInTheDocument();
  });

  it('keeps NDA client names out while summarizing the work', () => {
    expect(screen.getByText(/four white-label HRIS products \(client names under NDA\)/i));
  });

  it('renders accomplishment bullets from the weekly reports', () => {
    expect(screen.getByText(/night-differential double-counting/i)).toBeInTheDocument();
    expect(screen.getByText(/SSS \/ PhilHealth \/ Pag-IBIG/i)).toBeInTheDocument();
    expect(screen.getByText(/agentic AI workflows/i)).toBeInTheDocument();
  });
});
