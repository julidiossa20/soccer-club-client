import { HttpClient } from '../../../../services';
import { z } from 'zod';

const playerSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  position: z.string().min(1, 'La posición es obligatoria'),
  number: z.string().regex(/^\d+$/, 'Debe ser un número'),
  age: z.string().regex(/^\d+$/, 'Debe ser un número'),
});

export async function actionPlayers({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/player/${id}`);
    return { success: response.success, message: response.message };
  }

  const data = Object.fromEntries(formData);
  const validation = playerSchema.safeParse(data);

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  const payload = {
    ...data,
    number: Number(data.number),
    age: Number(data.age),
    photo: formData.get('photo') || '',
  };

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/player/${id}`, payload);
  } else {
    response = await HttpClient.post('/api/v1/player', payload);
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
