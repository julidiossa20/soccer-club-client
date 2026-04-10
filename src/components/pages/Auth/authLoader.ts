import { redirect } from 'react-router-dom';
import { store } from '../../../store';

/**
 * Loader to protect private routes.
 */
export function authLoader({ request }: { request: Request }) {
  const { auth } = store.getState();
  const url = new URL(request.url);
  const isProfile = url.searchParams.get('profile') === 'true';

  if (auth.isAuthenticated && !isProfile) {
    return redirect('/');
  }
  return null;
}
