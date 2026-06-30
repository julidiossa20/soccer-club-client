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

  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  if (!token) return;

  const response = await HttpClient.request<Omit<Login.Data, 'token'>>({
    method: 'PUT',
    endpoint: '/api/v1/user/change-password',
    body: {
      password: validation.data.password,
      confirmPassword: validation.data.confirm_password,
    },
    authtoken: token,
  });

  if (!response.success) {
    return {
      errors: {
        password: response.message,
      },
    };
  }

  return redirect('/auth/login?changed=true');
}
