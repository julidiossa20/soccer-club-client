import { redirect } from 'react-router-dom';
import getAuthState from '../../../helper/getAuthState';

export async function profileLoader() {
  const auth = await getAuthState();

  if (!auth.isAuthenticated) {
    return redirect('/');
  }

  return auth;
}
