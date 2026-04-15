import { HttpClient, adminConfigService } from '../../../../services';

export async function loaderMatches() {
  const [resMatches, resCatalogs] = await Promise.all([
    HttpClient.get<any[]>('/api/v1/match'),
    adminConfigService.getCatalogs(),
  ]);

  return {
    matches: resMatches.success ? resMatches.data : [],
    seasons: resCatalogs.success ? resCatalogs.data.seasons : [],
  };
}
