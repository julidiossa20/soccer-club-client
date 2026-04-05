import { store } from '../store';
import { addToast } from '../store/slices/toastSlice';

export const setToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration?: number) => {
    store.dispatch(
      addToast({
        message,
        type,
        duration,
      }),
    );
  };

  return {
    showToast,
    success: (message: string, duration?: number) => showToast(message, 'success', duration),
    error: (message: string, duration?: number) => showToast(message, 'error', duration),
    warning: (message: string, duration?: number) => showToast(message, 'warning', duration),
    info: (message: string, duration?: number) => showToast(message, 'info', duration),
  };
};
