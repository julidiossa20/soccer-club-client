import { HttpClient } from '../../../../services';
import { z } from 'zod';

const teamSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  manager: z.string().min(1, 'El entrenador es obligatorio'),
  points: z.string().regex(/^\d+$/, 'Debe ser un número'),
});

export async function actionTeams({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/team/${id}`);
    return { success: response.success, message: response.message };
  }

  const data = Object.fromEntries(formData);
  const validation = teamSchema.safeParse(data);

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  const payload = {
    ...data,
    points: Number(data.points),
  };

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/team/${id}`, payload);
  } else {
    response = await HttpClient.post('/api/v1/team', payload);
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
