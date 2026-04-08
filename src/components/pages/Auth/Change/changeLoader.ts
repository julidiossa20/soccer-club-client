import { redirect } from 'react-router-dom';
import { HttpClient } from '../../../../services';
import { store } from '../../../../store';

export async function changeLoader({ request }: { request: Request }) {
  const { auth } = store.getState();
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (token) {
    const response = await HttpClient.request<Omit<Login.Data, 'token'>>({
      method: 'GET',
      endpoint: `/api/v1/user/profile`,
      authtoken: token,
    });

    if (response.success && response.data) {
      const user = response.data;
      return user;
    } else if (!response.success) {
      localStorage.removeItem('token');
      if ([404, 401].includes(response.status)) return redirect('/'); // cuando no hay usuario o token invalido
    }
  }

  if (auth.isAuthenticated || !token) {
    return redirect('/');
  }
  return null;
}
