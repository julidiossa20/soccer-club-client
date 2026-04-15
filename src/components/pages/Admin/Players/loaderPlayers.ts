import { HttpClient, type IPlayer } from '../../../../services';
// import { IPlayer } from '../../../../services/adminServices';

export async function loaderPlayers() {
  const response = await HttpClient.get<IPlayer[]>('/api/v1/player');
  return response.success ? response.data : [];
}
