import { HttpClient, type ILeague } from '../../../../services';

export async function loaderLeagues() {
  const response = await HttpClient.get<ILeague[]>('/api/v1/league');
  if (response.success) {
    return response.data;
  }
  return [];
}
