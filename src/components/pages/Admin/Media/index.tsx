import { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, Copy, Trash2, FileText, ImageIcon } from 'lucide-react';
import { HttpClient } from '../../../../services/http-client';
import styles from './Media.module.css';

interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

export default function AdminMedia() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const res = await HttpClient.get<MediaFile[]>('/media');
    if (res.success) {
      setFiles(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await HttpClient.post<MediaFile>('/media', formData);
    if (res.success) {
      void fetchFiles();
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta imagen?')) return;
    const res = await HttpClient.delete(`/media/${id}`);
    if (res.success) {
      void fetchFiles();
    }
  };

  const copyToClipboard = (url: string) => {
    const fullUrl = `${API_BASE_URL}${url}`;
    void navigator.clipboard.writeText(fullUrl);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>
          GALERÍA <span className={styles.header__highlight}>MULTIMEDIA</span>
        </h1>
        <p>Administra los archivos y genera enlaces para noticias y patrocinadores.</p>
      </header>

      <div
        className={styles.upload__zone}
        onClick={() => fileInputRef.current?.click()}
        onKeyUp={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        role='button'
        tabIndex={0}>
        <Upload size={48} className={styles.upload__icon} />
        <h3 style={{ margin: 'var(--px10) 0' }}>Arrastra archivos aquí o haz clic para subir</h3>
        <p>Tamaño máximo 5MB. Formatos: JPG, PNG, WEBP, GIF.</p>
        <input
          type='file'
          ref={fileInputRef}
          onChange={(e) => void handleUpload(e)}
          style={{ display: 'none' }}
          accept='image/*'
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--px40)', color: 'var(--gray-400)' }}>Cargando galería...</div>
      ) : (
        <div className={styles.gallery__grid}>
          {files.map((file) => (
            <div key={file.id} className={styles.card}>
              <div className={styles.preview__container}>
                {file.mimetype.startsWith('image/') ? (
                  <img src={`${API_BASE_URL}${file.url}`} alt={file.originalName} className={styles.preview__image} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <FileText size={48} color='var(--gray-300)' />
                  </div>
                )}
                <span className={styles.preview__badge}>{file.mimetype.split('/')[1]}</span>
              </div>
              <div className={styles.card__info}>
                <div className={styles.card__filename} title={file.originalName}>
                  {file.originalName}
                </div>
                <div className={styles.card__meta}>
                  <span>{formatSize(file.size)}</span>
                  <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={styles.card__actions}>
                  <button type='button' className={styles.card__btn} onClick={() => copyToClipboard(file.url)}>
                    <Copy size={14} />
                    COPIAR URL
                  </button>
                  <button
                    type='button'
                    className={`${styles.card__btn} ${styles['card__btn--delete']}`}
                    onClick={() => void handleDelete(file.id)}>
                    <Trash2 size={14} />
                    ELIMINAR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: 'var(--px80)', color: 'var(--gray-400)' }}>
          <ImageIcon size={64} style={{ marginBottom: 'var(--px20)' }} />
          <h3>No hay archivos en la galería todavía</h3>
        </div>
      )}
    </div>
  );
}
