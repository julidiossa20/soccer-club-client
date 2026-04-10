import { redirect } from 'react-router-dom';
import { store } from '../../../store';

export function profileLoader() {
  const { auth } = store.getState();
  if (!auth.isAuthenticated) {
    return redirect('/');
  }
  return auth;
}
