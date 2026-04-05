import { redirect } from 'react-router-dom';
import { z } from 'zod';
import { HttpClient } from '../../../../services';

const registerSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().min(1, 'El email es requerido').email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export async function registerAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validation.data;

  try {
    const response = await HttpClient.post('/api/v1/user/register', {
      name,
      email,
      password,
    });

    if (!response.success) {
      return {
        errors: {
          email: response.message || 'Error en el registro',
        },
      };
    }

    // Success: Usually redirect to login
    return redirect('/auth/login?registered=true');
  } catch (error) {
    console.error('Register error:', error);
    return {
      errors: {
        email: 'Error inesperado al conectar con el servidor',
      },
    };
  }
}
