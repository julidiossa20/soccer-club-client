import { HttpClient, type ISponsor } from '../../../../services';
// import { ISponsor } from '../../../../services/adminServices';

export async function loaderSponsors() {
  const response = await HttpClient.get<ISponsor[]>('/api/v1/sponsor');
  return response.success ? response.data : [];
}
