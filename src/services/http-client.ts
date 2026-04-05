import type { ApiResponse, IErrorResponse } from './types';
import { setToast } from './setToast';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

export class HttpClient {
  static #toast = setToast();
  static async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: unknown,
  ): Promise<ApiResponse<T>> {
    const { error: errorToast, success: successToast } = this.#toast;
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

      let data: ApiResponse<T>;
      try {
        data = (await res.json()) as ApiResponse<T>;
      } catch {
        errorToast(`Error del servidor (${res.status}). No se recibió una respuesta válida.`);
        return {
          success: false,
          status: res.status,
          message: `Error del servidor (${res.status}). No se recibió una respuesta válida.`,
          errors: [],
        } as unknown as ApiResponse<T>;
      }

      successToast(data.message);
      return data;
    } catch (error) {
      // Manejar errores de red o excepciones imprevistas
      const errorResponse: IErrorResponse = {
        success: false,
        status: 0,
        message: error instanceof Error ? error.message : 'Error desconocido de red',
        errors: [],
      };
      errorToast(errorResponse.message);
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
