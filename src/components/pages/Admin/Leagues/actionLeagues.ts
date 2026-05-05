import type { AdminLeaguesState } from '.';
import { HttpClient } from '../../../../services';
import { z } from 'zod';

const leagueSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  country: z.string().min(1, 'El país es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
});

export async function actionLeagues({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Record<string, string>;

  if (data.actionType === 'save' || data.actionType === 'update') {
    const validation = leagueSchema.safeParse(data);
    if (!validation.success) {
      return { errors: validation.error.flatten().fieldErrors };
    }
  }

  let response;
  switch (data.actionType) {
    case 'save': {
      response = await HttpClient.post('/api/v1/league', { body: { ...data, logo: '⚽' } });
      break;
    }

    case 'update': {
      const league: AdminLeaguesState['league'] = JSON.parse(data.data) as Partial<ILeague.League>;
      response = await HttpClient.put(`/api/v1/league/${league?.id}`, { body: data });
      break;
    }

    case 'delete': {
      const league: AdminLeaguesState['league'] = JSON.parse(data.data) as Partial<ILeague.League>;
      response = await HttpClient.delete(`/api/v1/league/${league?.id}`);
      return { success: response.success, message: response.message };
    }

    default: {
      return { errors: { actionType: 'Acción no válida' } };
    }
  }

  if (response && !response.success) {
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

  if (response) {
    return { success: true, message: response.message };
  }

  return { errors: { general: 'Error inesperado' } };
}
