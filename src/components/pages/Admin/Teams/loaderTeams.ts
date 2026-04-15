import { HttpClient, type ITeam } from '../../../../services';
// import { ITeam } from '../../../../services/adminServices';

export async function loaderTeams() {
  const response = await HttpClient.get<ITeam[]>('/api/v1/team');
  return response.success ? response.data : [];
}
