import { redirect } from 'react-router-dom';
import { z } from 'zod';
import { HttpClient } from '../../../../services';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 caracteres'),
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

  const response = await HttpClient.post('/api/v1/user/register', data);

  if (!response.success) {
    return {
      errors: response.errors.reduce(
        (acc, { property, messages }) => {
          acc[property] = messages;
          return acc;
        },
        {} as Record<string, string | string[]>,
      ),
    };
  }

  return redirect('/');
}
