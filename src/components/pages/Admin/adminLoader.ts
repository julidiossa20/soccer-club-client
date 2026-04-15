import { redirect } from 'react-router-dom';
import getAuthState from '../../../helper/getAuthState';

/**
 * Loader to protect admin routes.
 */
export async function adminLoader() {
  const auth = await getAuthState();

  if (!auth.isAuthenticated) {
    return redirect('/auth/login');
  }

  if (auth.user?.role !== 'admin') {
    // return redirect('/');
  }

  if (!auth.user) throw new Error('no hay usuario');
  return auth.user;
}
