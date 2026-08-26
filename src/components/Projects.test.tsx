import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  beforeEach(() => {
    render(<Projects />);
  });

  it('renders the projects section', () => {
    expect(document.querySelector('#projects')).toBeInTheDocument();
  });

  it('renders all project cards including Task-Buddy', () => {
    expect(screen.getByRole('heading', { level: 3, name: /PLV eLib/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /AGOS/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Task-Buddy/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Compliant Customer Satisfaction Survey System/i })).toBeInTheDocument();
  });

  it('renders Live Demo, Source, and Sidecar links', () => {
    expect(screen.getAllByText('Live').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Source').length).toBeGreaterThan(0);
    expect(screen.getByText('Sidecar')).toBeInTheDocument();
  });

  it('renders high-impact architecture highlights instead of raw test numbers', () => {
    expect(screen.getByText('Decoupled RAG Microservice')).toBeInTheDocument();
    expect(screen.getByText('Hybrid Dense/Sparse RRF (k=60)')).toBeInTheDocument();
  });

  it('opens case study modal on clicking read case study button', () => {
    const readButtons = screen.getAllByText('Read Full Case Study');
    expect(readButtons.length).toBe(4);

    fireEvent.click(readButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /PLV eLib/i })).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close case study');
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
