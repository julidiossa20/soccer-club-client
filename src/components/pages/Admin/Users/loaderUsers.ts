import { HttpClient, type IUser } from '../../../../services';
// import { IUser } from '../../../../services/adminServices';

export async function loaderUsers() {
  const response = await HttpClient.get<IUser[]>('/api/v1/user');
  return response.success ? response.data : [];
}
