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

  it('hides both Show More and Show Less buttons for categories with fewer than or equal to 6 items', () => {
    // Seminars category has 3 items (<= 6)
    fireEvent.click(screen.getByText('Seminars'));

    expect(screen.queryByRole('button', { name: /show \d+ more/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /show less/i })).not.toBeInTheDocument();
  });

  it('renders topic filter buttons with labels', () => {
    expect(screen.getByRole('button', { name: /all topics/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ai & machine learning/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cybersecurity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cloud & devops/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /academic & honors/i })).toBeInTheDocument();
  });

  it('filters credentials when selecting a topic', () => {
    fireEvent.click(screen.getByRole('button', { name: /ai & machine learning/i }));
    expect(screen.getByText('Learn RAG (Retrieval-Augmented Generation)')).toBeInTheDocument();
    expect(screen.queryByText('Capture The Flag (CTF)')).not.toBeInTheDocument();
  });

  it('combines category tab and topic filter', () => {
    fireEvent.click(screen.getByRole('button', { name: /^certifications/i }));
    fireEvent.click(screen.getByRole('button', { name: /cybersecurity/i }));

    expect(screen.getByText('Google Cybersecurity Professional Certificate')).toBeInTheDocument();
    expect(
      screen.queryByText('Learn RAG (Retrieval-Augmented Generation)'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Capture The Flag (CTF)')).not.toBeInTheDocument();
  });

  it('disables topic filter button when a category has 0 items for that topic', () => {
    // Seminars category has 0 AI items
    fireEvent.click(screen.getByRole('button', { name: /^seminars/i }));
    const aiTopicBtn = screen.getByRole('button', { name: /ai & machine learning/i });
    expect(aiTopicBtn).toBeDisabled();
  });

  it('resets visible count when switching topics', () => {
    const showMoreBtn = screen.getByRole('button', { name: /show \d+ more/i });
    fireEvent.click(showMoreBtn);
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cybersecurity/i }));
    expect(screen.queryByRole('button', { name: /show less/i })).not.toBeInTheDocument();
  });

  it('displays empty state and restores credentials when clicking Reset Topic Filter', () => {
    // Select AI first, then switch to Seminars which has 0 AI items
    fireEvent.click(screen.getByRole('button', { name: /ai & machine learning/i }));
    fireEvent.click(screen.getByRole('button', { name: /^seminars/i }));

    expect(
      screen.getByText(/no credentials found for this topic under seminars/i),
    ).toBeInTheDocument();
    const resetBtn = screen.getByRole('button', { name: /reset topic filter/i });
    expect(resetBtn).toBeInTheDocument();

    // Clicking reset should revert topic filter to all and show seminar items
    fireEvent.click(resetBtn);
    expect(screen.getByText('AWS Community Day Philippines 2026')).toBeInTheDocument();
    expect(screen.queryByText(/no credentials found for this topic/i)).not.toBeInTheDocument();
  });

  it('toggles topic filter off when clicking the active topic button again', () => {
    const aiBtn = screen.getByRole('button', { name: /ai & machine learning/i });
    fireEvent.click(aiBtn);
    expect(screen.getByText('Learn RAG (Retrieval-Augmented Generation)')).toBeInTheDocument();
    expect(screen.queryByText('Capture The Flag (CTF)')).not.toBeInTheDocument();

    // Clicking AI again toggles back to All Topics
    fireEvent.click(aiBtn);
    expect(screen.getByText('Capture The Flag (CTF)')).toBeInTheDocument();
  });

  it('sets aria-pressed and accessible labels on topic filter buttons', () => {
    const allTopicsBtn = screen.getByRole('button', { name: /all topics/i });
    const aiBtn = screen.getByRole('button', { name: /ai & machine learning/i });

    expect(allTopicsBtn).toHaveAttribute('aria-pressed', 'true');
    expect(aiBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(aiBtn);
    expect(allTopicsBtn).toHaveAttribute('aria-pressed', 'false');
    expect(aiBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
