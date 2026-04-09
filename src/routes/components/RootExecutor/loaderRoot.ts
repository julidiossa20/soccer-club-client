import { redirect } from 'react-router-dom';
import { HttpClient } from '../../../services';
import { store } from '../../../store';
import { loginSuccess } from '../../../store/slices/authSlice';

export default async function loaderRoot() {
  const token = localStorage.getItem('token');
  const { auth } = store.getState();
  if (!token || auth.isAuthenticated) return;

  const response = await HttpClient.get<Omit<Login.Data, 'token'>>(`/api/v1/user/profile`);
  if (response.success && response.data) {
    const user = response.data;
    store.dispatch(loginSuccess({ user }));
    return user;
  } else {
    localStorage.removeItem('token');
    return redirect('/');
  }
}
