import { HttpClient } from '../../../../services';

export async function loaderSeasons() {
  const response = await HttpClient.get<any[]>('/api/v1/season');
  return response.success ? response.data : [];
}
