import { z } from 'zod';
import { HttpClient } from '../../../../services';
import { redirect } from 'react-router-dom';

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

  const response = await HttpClient.post('/api/v1/user/reset-password', {
    email: validation.data.email,
  });

  if (!response.success) {
    return {
      errors: {
        email: response.message,
      },
    };
  }

  return redirect('/');
}
