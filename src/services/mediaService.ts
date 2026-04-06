import { HttpClient } from './http-client';

export interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  inUse: boolean;
  usedBy: string;
  createdAt: string;
}

export const mediaService = {
  getAll: () => HttpClient.get<MediaFile[]>('/media'),

  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return HttpClient.post<{ url: string; id: number }>('/media', formData);
  },

  registerUrl: (url: string, originalName?: string) =>
    HttpClient.post<{ url: string; id: number }>('/media/url', { url, originalName }),

  markInUse: (id: number, usedBy?: string) =>
    HttpClient.patch<MediaFile>(`/media/${id}/use`, { usedBy }),

  release: (id: number) => HttpClient.patch<MediaFile>(`/media/${id}/release`, {}),

  delete: (id: number) => HttpClient.delete(`/media/${id}`),
};
