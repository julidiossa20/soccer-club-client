import { redirect } from 'react-router-dom';
import { z } from 'zod';
import { HttpClient } from '../../../../services';

const resetSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
});

export async function resetAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const validation = resetSchema.safeParse(data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await HttpClient.post('/api/v1/user/reset-password', {
      email: validation.data.email,
    });

    if (!response.success) {
      return {
        errors: {
          email: response.message || 'Error al procesar la solicitud',
        },
      };
    }

    return { success: true, message: 'Se ha enviado un correo con instrucciones.' };
  } catch (error) {
    console.error('Reset error:', error);
    return {
      errors: {
        email: 'Error inesperado',
      },
    };
  }
}
