import { redirect } from 'react-router-dom';
import { z } from 'zod';
import { HttpClient } from '../../../../services';

const changeSchema = z
  .object({
    password: z.string().min(6, 'Nueva contraseña debe tener al menos 6 caracteres'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  });

export async function changeAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const validation = changeSchema.safeParse(data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // usually need a token from query params or something
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  try {
    const response = await HttpClient.post('/api/v1/user/reset-password', {
      password: validation.data.password,
      token,
    });

    if (!response.success) {
      return {
        errors: {
          password: response.message || 'Token inválido o expirado',
        },
      };
    }

    return redirect('/auth/login?changed=true');
  } catch (error) {
    console.error('Change password error:', error);
    return {
      errors: {
        password: 'Error inesperado',
      },
    };
  }
}
