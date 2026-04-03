import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToast } from '../../../store/slices/toastSlice';
import styles from './toast.module.css';

interface ToastItemProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const ToastItem = ({ id, message, type, duration = 3000 }: ToastItemProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        dispatch(removeToast(id));
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, dispatch]);

  const handleClose = () => {
    dispatch(removeToast(id));
  };

  return (
    <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
      <div className={styles.toast__content}>
        <span className={styles.toast__icon}>
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ⓘ'}
        </span>
        <p className={styles.toast__message}>{message}</p>
      </div>
      <button className={styles.toast__close} onClick={handleClose} type='button' aria-label='Cerrar'>
        ✕
      </button>
    </div>
  );
};
