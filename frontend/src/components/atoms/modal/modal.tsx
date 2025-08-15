import React, { useEffect, useCallback } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  disableScrollLock?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  panelClassName,
  overlayClassName,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  disableScrollLock = false,
}) => {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen || disableScrollLock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen, disableScrollLock]);

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) onClose();
  }, [closeOnOverlayClick, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto" // ✅ viewport 작을 때 바깥 스크롤
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm ${overlayClassName ?? ""}`}
        onClick={handleOverlayClick}
      />

      {/* Panel */}
      <div
        className={[
          "relative z-10 rounded-2xl bg-white shadow-xl transition-all duration-300",
          "overflow-hidden flex flex-col",
          panelClassName ?? "",
        ].join(" ")}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 h-8 w-8 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overscroll-contain p-4 pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};
