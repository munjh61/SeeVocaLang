// atoms/modal/modal.tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  zIndex?: number;
  containerClassName?: string;
  blurBackdrop?: boolean;
};

export const FriendModal = ({
  isOpen,
  onClose,
  children,
  zIndex = 200,
  containerClassName = "",
  blurBackdrop = false,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0" style={{ zIndex }}>
      <div
        className={`absolute inset-0 bg-black/60 ${blurBackdrop ? "backdrop-blur-xl" : ""}`}
        onClick={onClose}
      />
      <div className="absolute inset-0 grid place-items-center p-4 pointer-events-none">
        <div role="dialog" aria-modal="true" className={`pointer-events-auto ${containerClassName}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
