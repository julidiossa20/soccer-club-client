import { useState, useCallback } from 'react';
import { HttpClient } from '../services/http-client';
import { useToast } from './useToast';
import type { IErrorDetail, ApiResponse } from '../services/types';

/** Opciones adicionales para la petición */
export interface RequestOptions {
  showToasts?: boolean; // Indica si se deben mostrar los mensajes automáticos (ej: Toasts o errores)
  successMessage?: string; // Mensaje de éxito a mostrar en lugar del mensaje del backend
  errorMessage?: string; //  Mensaje de error a mostrar en caso de fallo (ignora el del backend)
}

/**
 * Custom hook `useServices` para centralizar la gestión de peticiones.
 * Incluye estados de carga, manejo de errores y notificaciones (toasts).
 *
 * @template TData - El tipo de dato esperado en la respuesta exitosa (data).
 * @template TBody - El tipo de dato esperado en el cuerpo de la petición (para POST, PUT, PATCH).
 */
export default function useServices<TData = unknown, TBody = unknown>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TData | null>(null);
  const [errors, setErrors] = useState<IErrorDetail[] | null>(null);
  const { error: toastError, success: toastSuccess } = useToast();

  /** Definición de la función call con sobrecargas específicas para esta instancia */
  interface ICall {
    (method: 'get' | 'delete', url: `/api/v1${string}`, options?: RequestOptions): Promise<ApiResponse<TData>>;
    (
      method: 'post' | 'put' | 'patch',
      url: `/api/v1${string}`,
      body: TBody,
      options?: RequestOptions,
    ): Promise<ApiResponse<TData>>;
  }

  /**
   * Implementación del método call centralizado.
   * Dependiendo del método, el parámetro `body` será o no requerido.
   */
  const call = useCallback(
    async (
      method: 'get' | 'delete' | 'post' | 'put' | 'patch',
      url: `/api/v1${string}`,
      bodyOrOptions?: unknown,
      optionsIfBody?: RequestOptions,
    ): Promise<ApiResponse<TData>> => {
      const isBodyless = method === 'get' || method === 'delete';
      const body = isBodyless ? undefined : bodyOrOptions;
      const options = (isBodyless ? bodyOrOptions : optionsIfBody) as RequestOptions | undefined;
      const showToasts = options?.showToasts ?? true;

      setLoading(true);
      setErrors(null);

      // Instanciamos la respuesta con los tipos concretos
      let response: ApiResponse<TData>;
      try {
        if (method === 'get' || method === 'delete') {
          response = await HttpClient[method]<TData>(url);
        } else {
          response = await HttpClient[method]<TData>(url, body);
        }
      } catch (error) {
        setLoading(false);
        const unexpectedMsg = options?.errorMessage || 'Ocurrió un problema inesperado';
        if (showToasts) toastError(unexpectedMsg);
        throw error;
      }

      setLoading(false);

      // Manejo de Error
      if (!response.success) {
        setErrors(response.errors || []);
        const errorMsg = options?.errorMessage || response.message || 'Error en la petición';
        if (showToasts) {
          toastError(errorMsg);
        }
        return response; // Retorna ApiResponse (donde success es false)
      }

      // Manejo de Éxito
      setData(response.data); // seteamos la data en nuestro hook base
      const successMsg = options?.successMessage || response.message;
      if (showToasts && successMsg) {
        toastSuccess(successMsg);
      }

      return response; // Retorna ApiResponse (donde success es true, e incorpora response.data)
    },
    [toastError, toastSuccess],
  ) as ICall;

  /**
   * Busca los mensajes de error para una propiedad específica.
   */
  const findError = useCallback(
    (name: keyof TBody | string): string[] => {
      if (!errors || errors.length === 0) return [];

      const errorDetail = errors.find((e) => e.property === name);
      return errorDetail?.messages || [];
    },
    [errors],
  );

  /**
   * Elimina los errores de una propiedad específica del estado.
   * Útil para limpiar el mensaje de error mientras el usuario escribe.
   */
  const removeError = useCallback((name: keyof TBody | string) => {
    setErrors((prevErrors) => {
      if (!prevErrors) return null;
      return prevErrors.filter((e) => e.property !== name);
    });
  }, []);

  /**
   * Limpia todos los errores del estado.
   */
  const clearErrors = useCallback(() => setErrors(null), []);

  return {
    call,
    loading,
    data,
    errors,
    setErrors,
    setData,
    findError,
    removeError,
    clearErrors,
  };
}
