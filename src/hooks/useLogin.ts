import { useDispatch } from 'react-redux';
import useServices from './useServices';
import { loginSuccess } from '../store/slices/authSlice';
import { useCallback } from 'react';

export default function useLogin() {
  const dispatch = useDispatch();
  const { call } = useServices<Omit<Login.Data, 'token'>>();

  const signWithToken = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const response = await call('get', `/api/v1/user/profile`);

    if (response.success && response.data) {
      const user = response.data;
      dispatch(loginSuccess({ user }));
    } else {
      localStorage.removeItem('token');
    }
  }, [call, dispatch]);

  return { signWithToken };
}
