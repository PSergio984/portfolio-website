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

  it('renders initial credentials and expands all items when clicking Show More', () => {
    expect(screen.getByText('Capture The Flag (CTF)')).toBeInTheDocument();
    expect(screen.getByText(/Global Cyber Skills Benchmark/i)).toBeInTheDocument();

    const showMoreBtn = screen.getByRole('button', { name: /show more/i });
    expect(showMoreBtn).toBeInTheDocument();

    fireEvent.click(showMoreBtn);

    expect(screen.getByText(/Google Cybersecurity Professional Certificate/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn RAG/i)).toBeInTheDocument();
    expect(screen.getByText(/Mastering REST APIs with FastAPI/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Cloud Arcade Facilitator/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();
  });

  it('filters items when clicking a tab', () => {
    fireEvent.click(screen.getByText('Honors & Awards'));
    expect(screen.getByText('Capture The Flag (CTF)')).toBeInTheDocument();
    expect(
      screen.queryByText(/Google Cybersecurity Professional Certificate/i),
    ).not.toBeInTheDocument();
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

  it('renders newly verified Anthropic MCP, Claude Code, and FlyRank credentials when expanded', () => {
    const showMoreBtn = screen.getByRole('button', { name: /show more/i });
    fireEvent.click(showMoreBtn);

    expect(screen.getByText('Introduction to Model Context Protocol (MCP)')).toBeInTheDocument();
    expect(screen.getByText('Claude Code 101')).toBeInTheDocument();
    expect(screen.getByText('Learn Logging and Observability in Go')).toBeInTheDocument();
    expect(screen.getByText('Backend AI Engineering Internship Program')).toBeInTheDocument();
  });

  it('renders newly added GCI Data Science and AWS Community Day credentials when expanded', () => {
    const showMoreBtn = screen.getByRole('button', { name: /show more/i });
    fireEvent.click(showMoreBtn);

    expect(screen.getByText('GCI 2026 Data Science Cohort')).toBeInTheDocument();
    expect(screen.getByText('AWS Community Day Philippines 2026')).toBeInTheDocument();
  });
});
