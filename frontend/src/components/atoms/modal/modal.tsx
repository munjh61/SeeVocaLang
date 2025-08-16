import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-xl shadow-xl w-[1000px] max-w-[90%] p-4 pr-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-8 text-gray-400 hover:text-black text-lg"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

