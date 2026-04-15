import { X } from 'lucide-react';
import { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'md' | 'lg';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={styles.modal__content + (size === 'lg' ? ' ' + styles['modal__content--lg'] : '')}
        onClick={(e) => e.stopPropagation()}>
        <header className={styles.modal__header}>
          <h3>{title}</h3>
          <button className={styles.modal__close} onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>
  );
};
