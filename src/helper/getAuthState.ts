import { store } from '../store';
import type { AuthState } from '../store/slices/authSlice';

const getAuthState = (): Promise<AuthState> => {
  return new Promise((resolve) => {
    const { auth } = store.getState();
    if (!auth.isLoading) {
      return resolve(auth);
    }

    const unsubscribe = store.subscribe(() => {
      const { auth: currentAuth } = store.getState();
      if (!currentAuth.isLoading) {
        unsubscribe();
        resolve(currentAuth);
      }
    });
  });
};

export default getAuthState;
