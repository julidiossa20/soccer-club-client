import type { ApiResponse, IErrorResponse } from './types';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

export class HttpClient {
  static async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: unknown,
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
      const data = (await res.json()) as ApiResponse<T>;

      // Al retornar directamente data, estamos confiando en que el backend
      // ya devolvió el objeto ApiResponse estandarizado.
      // Sin embargo, si res.ok es false, el backend debería haber devuelto IErrorResponse.
      return data;
    } catch (error) {
      // Manejar errores de red o excepciones imprevistas
      const errorResponse: IErrorResponse = {
        success: false,
        status: 0,
        message: error instanceof Error ? error.message : 'Error desconocido de red',
        errors: [],
      };
      return errorResponse;
    }
  }

  static get<T>(endpoint: string) {
    return this.request<T>('GET', endpoint);
  }

  static post<T>(endpoint: string, body?: unknown) {
    return this.request<T>('POST', endpoint, body);
  }

  static put<T>(endpoint: string, body?: unknown) {
    return this.request<T>('PUT', endpoint, body);
  }

  static patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>('PATCH', endpoint, body);
  }

  static delete<T>(endpoint: string) {
    return this.request<T>('DELETE', endpoint);
  }
}
