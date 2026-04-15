import { HttpClient } from '../../../../services';
import { z } from 'zod';

const leagueSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  country: z.string().min(1, 'El país es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
});

export async function actionLeagues({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/league/${id}`);
    return { success: response.success, message: response.message };
  }

  const data = Object.fromEntries(formData);
  const validation = leagueSchema.safeParse(data);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/league/${id}`, data);
  } else {
    response = await HttpClient.post('/api/v1/league', { ...data, logo: '⚽' });
  }

  if (!response.success) {
    return {
      errors: response.errors?.reduce(
        (acc, { property, messages }) => {
          acc[property] = messages;
          return acc;
        },
        {} as Record<string, string | string[]>,
      ),
      message: response.message,
    };
  }

  return { success: true, message: response.message };
}
