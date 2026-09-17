import { render, screen, fireEvent } from '@testing-library/react';
import { VerificationModal } from './VerificationModal';

describe('VerificationModal', () => {
  it('renders nothing when item is null', () => {
    const { container } = render(<VerificationModal item={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title and img for standard image certificate', () => {
    render(
      <VerificationModal
        item={{ title: 'Test Certificate', imageUrl: '/assets/certs/test.webp' }}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Certificate')).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/assets/certs/test.webp');
  });

  it('renders iframe for PDF certificate preview', () => {
    render(
      <VerificationModal
        item={{ title: 'PDF Certificate', imageUrl: '/assets/certs/test.pdf' }}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', '/assets/certs/test.pdf');
  });

  it('renders fallback when imageUrl is undefined', () => {
    render(<VerificationModal item={{ title: 'No Image Cert' }} onClose={vi.fn()} />);
    expect(screen.getByText('Preview proof not available')).toBeInTheDocument();
  });

  it('triggers onClose when clicking close button', () => {
    const handleClose = vi.fn();
    render(
      <VerificationModal
        item={{ title: 'Test', imageUrl: '/assets/test.png' }}
        onClose={handleClose}
      />,
    );

    fireEvent.click(screen.getByLabelText('Close proof preview'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when pressing Escape key', () => {
    const handleClose = vi.fn();
    render(
      <VerificationModal
        item={{ title: 'Test', imageUrl: '/assets/test.png' }}
        onClose={handleClose}
      />,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when clicking backdrop', () => {
    const handleClose = vi.fn();
    render(
      <VerificationModal
        item={{ title: 'Test', imageUrl: '/assets/test.png' }}
        onClose={handleClose}
      />,
    );

    const backdrop = screen.getByTestId('verification-modal-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClose when clicking inside dialog card', () => {
    const handleClose = vi.fn();
    render(
      <VerificationModal
        item={{ title: 'Test', imageUrl: '/assets/test.png' }}
        onClose={handleClose}
      />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('supports legacy selectedCred prop', () => {
    render(
      <VerificationModal
        selectedCred={{ title: 'Legacy Prop Test', imageUrl: '/assets/legacy.png' }}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText('Legacy Prop Test')).toBeInTheDocument();
  });
});
