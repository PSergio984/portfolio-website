import { render, screen, fireEvent } from '@testing-library/react';
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

    expect(
      screen.getByText('Full Stack Software Engineering Intern — Team Lead'),
    ).toBeInTheDocument();
    expect(screen.getByText('Nexvision Innovations Inc.')).toBeInTheDocument();
  });

  it('summarizes the work and NDA context accurately', () => {
    expect(
      screen.getByText(/mission-critical enterprise HRIS features under NDA/i),
    ).toBeInTheDocument();
  });

  it('renders accomplishment bullets from reports including DOLE labor audit and Google XYZ metrics', () => {
    expect(
      screen.getByText(/Department of Labor and Employment \(DOLE\) statutory standards/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/progressive SSS\/WISP, PhilHealth, and Pag-IBIG/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/10 PM – 6 AM night differentials/i)).toBeInTheDocument();
    expect(screen.getByText(/FastAPI AI sidecar microservice/i)).toBeInTheDocument();
    expect(
      screen.getByText(/increasing retrieval accuracy from 81\.8% to 86\.4% Top-1/i),
    ).toBeInTheDocument();
  });

  it('renders verified program proofs with proof buttons and modal preview', () => {
    expect(screen.getByText('Verified Program Proofs')).toBeInTheDocument();
    expect(screen.getByText('Backend AI Engineering Internship Program')).toBeInTheDocument();
    expect(screen.getByText('ID: FR-D11-28D6B-6AC8A')).toBeInTheDocument();
    expect(screen.getByText('AI Fluency Internship Program')).toBeInTheDocument();
    expect(screen.getByText('ID: FR-D11-8C634-C586C')).toBeInTheDocument();

    const proofBtns = screen.getAllByRole('button', { name: /proof/i });
    expect(proofBtns.length).toBeGreaterThanOrEqual(2);

    // Click first proof button
    fireEvent.click(proofBtns[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/Backend AI Engineering Internship Program \(FR-D11-28D6B-6AC8A\)/i),
    ).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close proof preview');
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Edge case: test second proof and closing with Escape key
    fireEvent.click(proofBtns[1]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/AI Fluency Internship Program \(FR-D11-8C634-C586C\)/i),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
