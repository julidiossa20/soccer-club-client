import { HttpClient } from './http-client';
import type { ApiResponse } from './types';

export class BaseService<T> {
  constructor(protected endpoint: string) {}

  async getAll(): Promise<ApiResponse<T[]>> {
    return HttpClient.get<T[]>(`/api/v1${this.endpoint}` as any);
  }

  async getById(id: number | string): Promise<ApiResponse<T>> {
    return HttpClient.get<T>(`/api/v1${this.endpoint}/${id}` as any);
  }

  async create(data: Partial<T>): Promise<ApiResponse<T>> {
    return HttpClient.post<T>(`/api/v1${this.endpoint}` as any, data);
  }

  async update(id: number | string, data: Partial<T>): Promise<ApiResponse<T>> {
    return HttpClient.put<T>(`/api/v1${this.endpoint}/${id}` as any, data);
  }

  async delete(id: number | string): Promise<ApiResponse<void>> {
    return HttpClient.delete<void>(`/api/v1${this.endpoint}/${id}` as any);
  }
}
