import { HttpClient, adminConfigService } from '../../../../services';
import type { ITeam } from '../../../../services/adminServices';

export async function loaderTeams() {
  const [resTeams, resCatalogs] = await Promise.all([
    HttpClient.get<ITeam[]>('/api/v1/team'),
    adminConfigService.getCatalogs(),
  ]);

  return {
    teams: resTeams.success ? resTeams.data : [],
    seasons: resCatalogs.success ? resCatalogs.data.seasons : [],
  };
}
