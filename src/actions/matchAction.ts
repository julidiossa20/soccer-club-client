import { redirect } from 'react-router-dom';

export async function matchAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log('Match planning saved:', data);

  // Here we would call the API to save the match planning
  return { success: true, message: 'Planeación guardada con éxito.' };
}
