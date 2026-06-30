import { HttpClient, adminConfigService, type ISeason, type ILeague } from '../../../../services';

export async function loaderSeasons() {
  const [resSeasons, resCatalogs] = await Promise.all([
    HttpClient.get<ISeason[]>('/api/v1/season'),
    adminConfigService.getCatalogs(),
  ]);

  return {
    seasons: resSeasons.success ? resSeasons.data : [],
    leagues: resCatalogs.success ? resCatalogs.data.leagues : [],
  };
}

