import { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, Link, Images, CheckCircle2 } from 'lucide-react';
import { Modal } from '../Modal';
import { mediaService, type MediaFile } from '../../../services/mediaService';
import styles from './MediaPickerModal.module.css';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

type Tab = 'gallery' | 'upload' | 'url';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Callback con la URL seleccionada y el id del registro en media */
  onSelect: (url: string, mediaId: number) => void;
  /** Contexto de uso para marcar la imagen (ej: "player:5", "news:3") */
  usedBy?: string;
}

export function MediaPickerModal({ isOpen, onClose, onSelect, usedBy }: MediaPickerModalProps) {
  const [tab, setTab] = useState<Tab>('gallery');
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [urlName, setUrlName] = useState('');
  const [urlPreviewError, setUrlPreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const res = await mediaService.getAll();
    if (res.success) setFiles(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      void fetchFiles();
      setSelected(null);
      setUrlInput('');
      setUrlName('');
      setTab('gallery');
    }
  }, [isOpen, fetchFiles]);

  const resolveUrl = (url: string) => (url.startsWith('http') ? url : `${API_BASE_URL}${url}`);

  const handleConfirmGallery = async () => {
    if (!selected) return;
    if (usedBy) await mediaService.markInUse(selected.id, usedBy);
    onSelect(resolveUrl(selected.url), selected.id);
    onClose();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const res = await mediaService.upload(file);
    if (res.success) {
      await fetchFiles();
      setTab('gallery');
    }
    setLoading(false);
    e.target.value = '';
  };

  const handleRegisterUrl = async () => {
    if (!urlInput.trim()) return;
    setLoading(true);
    const res = await mediaService.registerUrl(urlInput.trim(), urlName.trim() || urlInput.trim());
    if (res.success) {
      if (usedBy) await mediaService.markInUse(res.data.id, usedBy);
      onSelect(urlInput.trim(), res.data.id);
      onClose();
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Seleccionar imagen' size='lg'>
      <div className={styles.wrapper}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            type='button'
            className={`${styles.tab} ${tab === 'gallery' ? styles['tab--active'] : ''}`}
            onClick={() => setTab('gallery')}>
            <Images size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            Galería
          </button>
          <button
            type='button'
            className={`${styles.tab} ${tab === 'upload' ? styles['tab--active'] : ''}`}
            onClick={() => setTab('upload')}>
            <Upload size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            Subir
          </button>
          <button
            type='button'
            className={`${styles.tab} ${tab === 'url' ? styles['tab--active'] : ''}`}
            onClick={() => setTab('url')}>
            <Link size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            URL externa
          </button>
        </div>

        {/* Gallery tab */}
        {tab === 'gallery' && (
          <>
            {loading ? (
              <div className={styles.loading}>Cargando galería...</div>
            ) : files.length === 0 ? (
              <div className={styles.empty}>
                <Images size={40} />
                <span>No hay imágenes. Sube una o registra una URL.</span>
              </div>
            ) : (
              <div className={styles.gallery__grid}>
                {files.map((f) => (
                  <div
                    key={f.id}
                    role='button'
                    tabIndex={0}
                    className={`${styles.gallery__item} ${selected?.id === f.id ? styles['gallery__item--selected'] : ''} ${f.inUse && selected?.id !== f.id ? styles['gallery__item--inuse'] : ''}`}
                    onClick={() => setSelected(f)}
                    onKeyUp={(e) => e.key === 'Enter' && setSelected(f)}>
                    <img src={resolveUrl(f.url)} alt={f.originalName} className={styles.gallery__img} />
                    {f.inUse && (
                      <span className={`${styles.gallery__badge} ${styles['gallery__badge--inuse']}`}>En uso</span>
                    )}
                    {selected?.id === f.id && (
                      <div className={styles.gallery__check}>
                        <CheckCircle2 size={28} color='white' />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className={styles.footer}>
              <button type='button' className={`${styles.btn} ${styles['btn--secondary']}`} onClick={onClose}>
                Cancelar
              </button>
              <button
                type='button'
                className={`${styles.btn} ${styles['btn--primary']}`}
                disabled={!selected}
                onClick={() => void handleConfirmGallery()}>
                Seleccionar
              </button>
            </div>
          </>
        )}

        {/* Upload tab */}
        {tab === 'upload' && (
          <>
            <div
              className={styles.upload__zone}
              role='button'
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyUp={(e) => e.key === 'Enter' && fileInputRef.current?.click()}>
              <Upload size={40} color='var(--gray-400)' />
              <span style={{ fontWeight: 600 }}>Haz clic para subir una imagen</span>
              <p>Máx. 5MB · JPG, PNG, WEBP, GIF</p>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={(e) => void handleUpload(e)}
              />
            </div>
            {loading && <div className={styles.loading}>Subiendo imagen...</div>}
          </>
        )}

        {/* URL tab */}
        {tab === 'url' && (
          <>
            <div className={styles.url__form}>
              <input
                type='url'
                className={styles.url__input}
                placeholder='https://ejemplo.com/imagen.jpg'
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setUrlPreviewError(false);
                }}
              />
              <input
                type='text'
                className={styles.url__input}
                placeholder='Nombre descriptivo (opcional)'
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
              />
              {urlInput && !urlPreviewError && (
                <img
                  src={urlInput}
                  alt='preview'
                  className={styles.url__preview}
                  onError={() => setUrlPreviewError(true)}
                />
              )}
              {urlPreviewError && (
                <p style={{ color: 'var(--error-color)', fontSize: '0.8rem', margin: 0 }}>
                  No se pudo cargar la imagen. Verifica la URL.
                </p>
              )}
            </div>
            <div className={styles.footer}>
              <button type='button' className={`${styles.btn} ${styles['btn--secondary']}`} onClick={onClose}>
                Cancelar
              </button>
              <button
                type='button'
                className={`${styles.btn} ${styles['btn--primary']}`}
                disabled={!urlInput.trim() || urlPreviewError || loading}
                onClick={() => void handleRegisterUrl()}>
                Registrar y usar
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
