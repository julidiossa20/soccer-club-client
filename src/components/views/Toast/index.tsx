import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { ToastItem } from './ToastItem';
import styles from './toast.module.css';

export const ToastContainer = () => {
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  return (
    <div className={styles.toast__container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};
