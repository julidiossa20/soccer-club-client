import { HttpClient } from '../../../../services';

export async function loaderLeagues() {
  const response = await HttpClient.request({
    optionsToast: { showToasts: false },
    endpoint: '/api/v1/league',
    method: 'GET',
  });
  if (response.success) {
    return response.data;
  }
  return [];
}
