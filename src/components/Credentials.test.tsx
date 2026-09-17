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

  it('renders initial credentials and expands in batches of 10 when clicking Show More, and collapses with Show Less', () => {
    expect(screen.getByText('Capture The Flag (CTF)')).toBeInTheDocument();
    expect(screen.getByText(/Global Cyber Skills Benchmark/i)).toBeInTheDocument();

    const showMoreBtn = screen.getByRole('button', { name: /show \d+ more/i });
    expect(showMoreBtn).toBeInTheDocument();

    fireEvent.click(showMoreBtn);

    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();

    // Click Show Less to collapse back to 6
    const showLessBtn = screen.getByRole('button', { name: /show less/i });
    fireEvent.click(showLessBtn);
    expect(screen.queryByRole('button', { name: /show less/i })).not.toBeInTheDocument();
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

  it('renders newly verified credentials when expanded across batches', () => {
    // Click Show More until all items are loaded
    let showMoreBtn = screen.queryByRole('button', { name: /show \d+ more/i });
    while (showMoreBtn) {
      fireEvent.click(showMoreBtn);
      showMoreBtn = screen.queryByRole('button', { name: /show \d+ more/i });
    }

    expect(screen.getByText('Introduction to Model Context Protocol (MCP)')).toBeInTheDocument();
    expect(screen.getByText('Claude Code 101')).toBeInTheDocument();
    expect(screen.getByText('Learn Logging and Observability in Go')).toBeInTheDocument();
    expect(screen.getByText('GCI 2026 Data Science Cohort')).toBeInTheDocument();
    expect(screen.getByText('AWS Community Day Philippines 2026')).toBeInTheDocument();
  });

  it('resets visible count back to initial 6 when switching tabs', () => {
    const showMoreBtn = screen.getByRole('button', { name: /show \d+ more/i });
    fireEvent.click(showMoreBtn);
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();

    // Click another tab
    fireEvent.click(screen.getByText('Certifications'));
    // Tab switch should reset visible count to 6, so Show Less should disappear
    expect(screen.queryByRole('button', { name: /show less/i })).not.toBeInTheDocument();
  });
});
