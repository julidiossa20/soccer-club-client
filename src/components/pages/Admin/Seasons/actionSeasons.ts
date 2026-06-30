import { HttpClient } from '../../../../services';
import { z } from 'zod';

const seasonSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  year: z.string().regex(/^\d+$/, 'Debe ser un número'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string(),
  leagueId: z.string().min(1, 'La liga es obligatoria'),
});

export async function actionSeasons({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/season/${id}`);
    return { success: response.success, message: response.message };
  }

  const rawData = Object.fromEntries(formData);
  const validation = seasonSchema.safeParse(rawData);

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  // Transform for TypeORM relation
  const data = {
    ...validation.data,
    league: { id: Number(validation.data.leagueId) },
  };

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/season/${id}`, data);
  } else {
    response = await HttpClient.post('/api/v1/season', data);
  }

  if (!response.success) {
    return {
      errors: response.errors?.reduce((acc: any, { property, messages }: any) => {
        acc[property] = messages;
        return acc;
      }, {}),
      message: response.message,
    };
  }

  return { success: true, message: response.message };
}
