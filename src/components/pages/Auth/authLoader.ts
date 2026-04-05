import { redirect } from 'react-router-dom';

/**
 * Loader to protect private routes.
 */
export function protectedLoader() {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/auth/login');
  }
  return null;
}
