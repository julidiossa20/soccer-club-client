import { HttpClient, type IPlayer } from '../../../../services';
// import { IPlayer } from '../../../../services/adminServices';

export async function loaderMatchPlanning() {
  // We need players to place them on the stadium
  const resPlayers = await HttpClient.get<IPlayer[]>('/api/v1/player');
  // And maybe the latest match to plan for
  const resMatches = await HttpClient.get<any[]>('/api/v1/match/upcoming');

  return {
    players: resPlayers.success ? resPlayers.data : [],
    nextMatch: resMatches.success ? resMatches.data[0] : null,
  };
}
