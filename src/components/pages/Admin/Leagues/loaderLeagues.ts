import { HttpClient } from '../../../../services';

export async function loaderLeagues() {
  const response = await HttpClient.get('/api/v1/league', { optionsToast: { showToastsSuccess: false } });
  if (response.success) {
    return response.data;
  }
  return [];
}
