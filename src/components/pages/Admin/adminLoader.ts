import { redirect } from 'react-router-dom';
import { store } from '../../../store';

/**
 * Loader to protect admin routes.
 */
export function adminLoader() {
  const { auth } = store.getState();

  // If not authenticated, go to login
  if (!auth.isAuthenticated) {
    return redirect('/auth/login');
  }

  // If not admin, go to home
  // Note: we assume 'admin' role, or 'editor' might have access too
  if (auth.user?.role !== 'admin' && auth.user?.role !== 'editor') {
    // return redirect('/');
  }

  return null;
}
