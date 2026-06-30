import { HttpClient, type INews } from '../../../../services';
// import { INews } from '../../../../services/adminServices';

export async function loaderNews() {
  const response = await HttpClient.get<INews[]>('/api/v1/news');
  return response.success ? response.data : [];
}
