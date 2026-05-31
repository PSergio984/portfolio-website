import { useEffect } from "react";
import { X, Download, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF Viewer"
    >
      <div
        className="bg-[var(--bg)] border border-[var(--border)] w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-10 transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-[var(--text-h)]">
              Eric Gabriel Manabat - Resume
            </h3>
            <p className="text-xs text-[var(--text)] opacity-80 hidden sm:block">
              PDF Document
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Open in New Tab (useful for mobile browsers or alternative viewer) */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] text-[var(--text-h)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open</span>
            </a>

            {/* Direct Download Button */}
            <a
              href="/resume.pdf"
              download="Eric_Manabat_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--text-h)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <div className="w-px h-6 bg-[var(--border)]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-transparent hover:border-[var(--border)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] transition-all text-[var(--text)] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-[var(--accent-bg)] relative flex flex-col items-center justify-center">
          {/* Iframe for PDF rendering */}
          <iframe
            src="/resume.pdf#toolbar=0"
            className="w-full h-full border-none"
            title="Eric Gabriel Manabat Resume"
          />

          {/* Mobile Helper/Fallback bar */}
          <div className="absolute bottom-4 left-4 right-4 bg-[var(--bg)]/90 backdrop-blur-sm border border-[var(--border)] px-4 py-3 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left sm:hidden pointer-events-auto">
            <span className="text-xs text-[var(--text-h)] font-medium">
              Having trouble viewing?
            </span>
            <div className="flex gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] text-[var(--text-h)]"
              >
                Open in tab
              </a>
              <a
                href="/resume.pdf"
                download="Eric_Manabat_Resume.pdf"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent)] text-white"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
