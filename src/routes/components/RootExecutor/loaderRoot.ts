import { HttpClient } from '../../../services';
import { store } from '../../../store';
import { loginSuccess, setLoading } from '../../../store/slices/authSlice';

export default async function loaderRoot() {
  const token = localStorage.getItem('token');
  const { auth } = store.getState();

  if (!token) {
    store.dispatch(setLoading(false));
    return null;
  }

  if (auth.isAuthenticated) {
    return null;
  }

  const response = await HttpClient.request<Omit<Login.Data, 'token'>>({
    endpoint: `/api/v1/user/profile`,
    method: 'GET',
    optionsToast: { showToasts: false },
  });
  if (response.success && response.data) {
    const user = response.data;
    store.dispatch(loginSuccess({ user }));
  } else {
    store.dispatch(setLoading(false));
  }

  return null;
}
