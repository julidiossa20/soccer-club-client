import { HttpClient } from '../../../../services';
import { z } from 'zod';

const seasonSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  year: z.string().regex(/^\d+$/, 'Debe ser un número'),
  startDate: z.string(),
  endDate: z.string(),
  status: z.string(),
});

export async function actionSeasons({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/season/${id}`);
    return { success: response.success, message: response.message };
  }

  const data = Object.fromEntries(formData);
  const validation = seasonSchema.safeParse(data);

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/season/${id}`, data);
  } else {
    response = await HttpClient.post('/api/v1/season', data);
  }

  if (!response.success) {
    return {
      errors: response.errors?.reduce((acc, { property, messages }) => {
        acc[property] = messages;
        return acc;
      }, {} as any),
      message: response.message,
    };
  }

  return { success: true, message: response.message };
}
