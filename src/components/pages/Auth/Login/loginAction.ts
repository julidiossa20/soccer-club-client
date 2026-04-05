import { redirect } from 'react-router-dom';
import { z } from 'zod';
import { HttpClient } from '../../../../services';
import { store } from '../../../../store';
import { loginSuccess } from '../../../../store/slices/authSlice';

const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Zod Validation
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validation.data;

  try {
    const response = await HttpClient.post<Login.Data>('/api/v1/user/login', {
      email,
      password,
    });

    if (!response.success) {
      return {
        // En este punto, el mensaje viene directo del backend
        errors: {
          email: response.message || 'Credenciales incorrectas',
        },
      };
    }

    // Success logic
    const { token, ...user } = response.data;
    localStorage.setItem('token', token);
    store.dispatch(loginSuccess({ user }));

    return redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    return {
      errors: {
        email: 'Error inesperado al conectar con el servidor',
      },
    };
  }
}
