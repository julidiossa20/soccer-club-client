import { HttpClient } from '../../../../services';
import { z } from 'zod';

const sponsorSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  contractValue: z.string().regex(/^\d+$/, 'Debe ser un número'),
});

export async function actionSponsors({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/sponsor/${id}`);
    return { success: response.success, message: response.message };
  }

  const data = Object.fromEntries(formData);
  const validation = sponsorSchema.safeParse(data);

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  const payload = {
    ...data,
    contractValue: Number(data.contractValue),
  };

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/sponsor/${id}`, payload);
  } else {
    response = await HttpClient.post('/api/v1/sponsor', { ...payload, status: 'active' });
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
