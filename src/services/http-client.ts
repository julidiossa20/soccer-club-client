import type { ApiResponse, IErrorResponse } from './types';
import { setToast } from './setToast';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

interface ReaquestProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  body?: unknown;
  authtoken?: string;
  optionsToast?: RequestOptions;
}

export interface RequestOptions {
  showToasts?: boolean; // Indica si se deben mostrar los mensajes automáticos (ej: Toasts o errores)
  successMessage?: string; // Mensaje de éxito a mostrar en lugar del mensaje del backend
  errorMessage?: string; //  Mensaje de error a mostrar en caso de fallo (ignora el del backend)
}
export class HttpClient {
  static #toast = setToast();
  static async request<T>({ endpoint, method, authtoken, body, optionsToast }: ReaquestProps): Promise<ApiResponse<T>> {
    const { error: errorToast, success: successToast } = this.#toast;
    const token = localStorage.getItem('token');
    try {
      const isFormData = body instanceof FormData;
      const options: RequestInit = {
        method,
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          Authorization: `Bearer ${authtoken || token}`,
        },
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      };

      const finalUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const res = await fetch(finalUrl, options);

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

      if (!data.success) {
        if (!optionsToast?.showToasts) errorToast(optionsToast?.errorMessage || data.message);
      } else {
        if (!optionsToast?.showToasts) successToast(optionsToast?.successMessage || data.message);
      }

      return data;
    } catch (error) {
      // Manejar errores de red o excepciones imprevistas
      const errorResponse: IErrorResponse = {
        success: false,
        status: 0,
        message: error instanceof Error ? error.message : 'Error desconocido de red',
        errors: [],
      };
      if (!optionsToast?.showToasts) errorToast(optionsToast?.errorMessage || errorResponse.message);
      return errorResponse;
    }
  }

  static get<T>(endpoint: `/api/v1${string}`) {
    return this.request<T>({ method: 'GET', endpoint });
  }

  static post<T>(endpoint: `/api/v1${string}`, body?: unknown) {
    return this.request<T>({ method: 'POST', endpoint, body });
  }

  static put<T>(endpoint: `/api/v1${string}`, body?: unknown) {
    return this.request<T>({ method: 'PUT', endpoint, body });
  }

  static patch<T>(endpoint: `/api/v1${string}`, body?: unknown) {
    return this.request<T>({ method: 'PATCH', endpoint, body });
  }

  static delete<T>(endpoint: `/api/v1${string}`) {
    return this.request<T>({ method: 'DELETE', endpoint });
  }
}
