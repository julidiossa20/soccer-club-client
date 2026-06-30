import { HttpClient, adminConfigService } from '../../../../services';
import type { IPlayer } from '../../../../services';

export async function loaderPlayers() {
  const [resPlayers, resCatalogs] = await Promise.all([
    HttpClient.get<IPlayer[]>('/api/v1/player'),
    adminConfigService.getCatalogs(),
  ]);

  return {
    players: resPlayers.success ? resPlayers.data : [],
    teams: resCatalogs.success ? resCatalogs.data.teams : [],
  };
}
