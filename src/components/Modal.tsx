import React, { useEffect } from 'react';
import { ModalProps } from '../types';

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <span
        className="close-modal-absolute"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onClose();
        }}
      >
        &times;
      </span>

      <div className="cyber-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
