import { HttpClient } from '../../../../services';

export async function actionNews({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id');

  if (intent === 'delete') {
    const response = await HttpClient.delete(`/api/v1/news/${id}`);
    return { success: response.success, message: response.message };
  }

  // News typically has its own create/edit page, but if it's in a modal:
  const data = Object.fromEntries(formData);

  let response;
  if (id) {
    response = await HttpClient.put(`/api/v1/news/${id}`, data);
  } else {
    response = await HttpClient.post('/api/v1/news', data);
  }

  return { success: response.success, message: response.message, errors: response.errors };
}
