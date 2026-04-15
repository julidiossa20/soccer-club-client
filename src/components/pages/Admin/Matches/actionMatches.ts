import { HttpClient } from '../../../../services';

export async function actionMatches({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/match/${id}`);
    return { success: response.success, message: response.message };
  }

  const rawData = Object.fromEntries(formData);
  
  // Transform for TypeORM
  const data = {
    ...rawData,
    isHome: rawData.isHome === 'true',
    season: { id: Number(rawData.seasonId) },
  };

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/match/${id}`, data);
  } else {
    response = await HttpClient.post('/api/v1/match', data);
  }

  return { 
    success: response.success, 
    message: response.message, 
    errors: response.errors?.reduce((acc: any, { property, messages }: any) => {
      acc[property] = messages;
      return acc;
    }, {})
  };
}
