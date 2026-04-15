import { HttpClient, adminConfigService } from '../../../../services';

export async function loaderSeasons() {
  const [resSeasons, resCatalogs] = await Promise.all([
    HttpClient.get<any[]>('/api/v1/season'),
    adminConfigService.getCatalogs(),
  ]);

  return {
    seasons: resSeasons.success ? resSeasons.data : [],
    leagues: resCatalogs.success ? resCatalogs.data.leagues : [],
  };
}
