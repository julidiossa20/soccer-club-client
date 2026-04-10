import { z } from 'zod';
import { HttpClient } from '../../../services';
import { store } from '../../../store';
import { loginSuccess } from '../../../store/slices/authSlice';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 caracteres'),
});

export async function profileAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const response = await HttpClient.put<Login.Data>('/api/v1/user/update', data);

  if (response.success && response.data) {
    const user = response.data;
    store.dispatch(loginSuccess({ user }));
    return user;
  } else if (!response.success) {
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
}
