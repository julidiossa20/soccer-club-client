import { redirect } from 'react-router-dom';

/**
 * Loader to prevent authenticated users from accessing login/register pages.
 */
export function authLoader() {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/');
  }
  return null;
}
