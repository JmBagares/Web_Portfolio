import React, { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; title: string; alt?: string }>;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}: LightboxProps) {
  const currentImage = images[currentIndex];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on ESC and navigate with arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Focus close button on open (accessibility)
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      // Prevent background scroll if needed (Radix does this automatically; keep if custom lightbox)
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label={currentImage?.title ?? "Image viewer"}
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-50 mx-auto flex h-full w-full max-w-5xl items-center px-4">
        <div className="flex h-full max-h-[90vh] w-full flex-col rounded-xl border border-border bg-background shadow-lg">
          {/* Header: controls */}
          <div className="flex items-center justify-between gap-2 border-b border-border p-3">
            <div className="flex items-center gap-2">
              <Button
                aria-label="Previous image"
                variant="secondary"
                onClick={onPrev}
                disabled={images.length <= 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                aria-label="Next image"
                variant="secondary"
                onClick={onNext}
                disabled={images.length <= 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              {images.length > 0 && (
                <span>
                  {currentIndex + 1} of {images.length}
                </span>
              )}
            </div>

            <Button
              ref={closeButtonRef}
              aria-label="Close"
              variant="secondary"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable image area */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mx-auto">
              {/* 
                object-contain makes the whole image visible if possible,
                and when it's too tall the container (this area) will scroll.
              */}
              <img
                src={currentImage.src}
                alt={currentImage.alt ?? currentImage.title}
                className="mx-auto h-auto max-h-full w-auto max-w-full object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Footer / Caption */}
          <div className="border-t border-border bg-background/95 p-4 backdrop-blur-sm">
            <p className="text-center font-medium text-foreground">
              {currentImage.title}
            </p>
            {images.length > 1 && (
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Use ← → keys to navigate, Esc to close
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
