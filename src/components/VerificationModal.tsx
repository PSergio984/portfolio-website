import { X } from 'lucide-react';
import { useEffect } from 'react';

export interface VerificationItem {
  title: string;
  imageUrl?: string;
}

export interface VerificationModalProps {
  item?: VerificationItem | null;
  /** Backward-compatibility alias for item */
  selectedCred?: VerificationItem | null;
  onClose: () => void;
}

export function VerificationModal({ item, selectedCred, onClose }: VerificationModalProps) {
  const activeItem = item ?? selectedCred ?? null;

  useEffect(() => {
    if (!activeItem) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, onClose]);

  if (!activeItem) return null;
  const isPdf = activeItem.imageUrl?.toLowerCase().endsWith('.pdf');

  return (
    <div
      data-testid="verification-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-cred-title"
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center cursor-default bg-white dark:bg-[#0b101d] p-4 rounded-2xl border border-[var(--border)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)] px-1">
          <div
            className="text-sm font-bold text-[var(--text-h)] truncate pr-4"
            id="modal-cred-title"
          >
            {activeItem.title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-[var(--code-bg)] hover:bg-[var(--card-hover)] text-[var(--text)] rounded-full transition-colors cursor-pointer border border-[var(--border)]"
            aria-label="Close proof preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeItem.imageUrl ? (
          isPdf ? (
            <iframe
              src={activeItem.imageUrl}
              title={`Verification for ${activeItem.title}`}
              className="w-full h-[78vh] bg-white rounded-xl border border-[var(--border)] shadow-2xl"
            />
          ) : (
            <img
              src={activeItem.imageUrl}
              alt={`Certificate proof for ${activeItem.title}`}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-[var(--border)]"
            />
          )
        ) : (
          <div className="w-full max-w-md h-48 flex items-center justify-center bg-[var(--code-bg)] rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)]">
            Preview proof not available
          </div>
        )}
      </div>
    </div>
  );
}
