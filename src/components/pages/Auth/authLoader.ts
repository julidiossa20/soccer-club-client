import { redirect } from 'react-router-dom';
import { store } from '../../../store';

/**
 * Loader to protect private routes.
 */
export function protectedLoader() {
  const { auth } = store.getState();
  if (auth.isAuthenticated) {
    return redirect('/');
  }
  return null;
}
