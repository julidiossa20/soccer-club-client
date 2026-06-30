import { HttpClient } from '../../../../services';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  role: z.string(),
});

export async function actionUsers({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/user/${id}`);
    return { success: response.success, message: response.message };
  }

  const data = Object.fromEntries(formData);
  const validation = userSchema.safeParse(data);

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/user/${id}`, data);
  } else {
    // For creation, we might need a default password or phone
    response = await HttpClient.post('/api/v1/user', { ...data, phone: 'N/A' });
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
