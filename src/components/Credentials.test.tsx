import { render, screen, fireEvent } from '@testing-library/react';
import { Credentials } from './Credentials';

describe('Credentials Component', () => {
  beforeEach(() => {
    render(<Credentials />);
  });

  it('renders the credentials section', () => {
    expect(document.querySelector('#credentials')).toBeInTheDocument();
    expect(screen.getByText('Honors, Certifications & Fellowships')).toBeInTheDocument();
  });

  it('renders tab buttons for filtering credentials', () => {
    expect(screen.getByText('All Credentials')).toBeInTheDocument();
    expect(screen.getByText('Honors & Awards')).toBeInTheDocument();
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('Programs & Fellowships')).toBeInTheDocument();
    expect(screen.getByText('Seminars')).toBeInTheDocument();
  });

  it('renders credentials items in All view including Google Cybersecurity and Boot.dev RAG', () => {
    expect(screen.getByText('Capture The Flag (CTF)')).toBeInTheDocument();
    expect(screen.getByText(/Global Cyber Skills Benchmark/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Cybersecurity Professional Certificate/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn RAG/i)).toBeInTheDocument();
    expect(screen.getByText(/Mastering REST APIs with FastAPI/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Cloud Arcade Facilitator/i)).toBeInTheDocument();
  });

  it('filters items when clicking a tab', () => {
    fireEvent.click(screen.getByText('Honors & Awards'));
    expect(screen.getByText('Capture The Flag (CTF)')).toBeInTheDocument();
    expect(screen.queryByText(/Google Cybersecurity Professional Certificate/i)).not.toBeInTheDocument();
  });

  it('opens and closes the proof preview modal with matching title', () => {
    const proofButtons = screen.getAllByText('Proof');
    expect(proofButtons.length).toBeGreaterThan(0);

    fireEvent.click(proofButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close proof preview');
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
