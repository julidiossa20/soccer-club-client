import { useState } from 'react';
import type { AuthUser } from '../../../../../store/slices/authSlice';
import { AvatarGenerator } from '../../../../core/AvatarGenerator/AvatarGenerator';
import Avatar from './Avatar';
import styles from './statistics.module.css';
import { Modal } from '../../../../core/Modal';

export default function Statistics({ user }: { user: AuthUser }) {
  const [showAvatarSelector, setShowAvatarSelector] = useState<boolean>(false);

  const date = new Date(user.createdAt);

  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric',
  }).format(date);

  const handleAvatarSelect = (_url: string) => {
    // setUserData({ ...userData, photo: url });
    setShowAvatarSelector(false);
  };
  return (
    <div className={styles.statistics}>
      <div className={styles.statistics__avatar}>
        <Avatar user={user} setShowAvatarSelector={setShowAvatarSelector} />
      </div>

      {showAvatarSelector && (
        <Modal isOpen={showAvatarSelector} onClose={() => setShowAvatarSelector(false)} title=''>
          <AvatarGenerator onSelect={handleAvatarSelect} onClose={() => setShowAvatarSelector(false)} />
        </Modal>
      )}
      <h3 style={{ margin: '0', fontSize: '1.4rem' }}>{user.name}</h3>
      <p style={{ color: '#666', marginTop: '5px' }}>{user.role}</p>

      <div
        style={{
          marginTop: '1.875rem',
          padding: '0.9375rem',
          background: '#f8fafc',
          borderRadius: '0.5rem',
          textAlign: 'left',
        }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.625rem' }}>Estadísticas de Usuario</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
          <span>Miembro desde</span>
          <strong>{formattedDate}</strong>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#64748b',
            marginTop: '0.3125rem',
          }}>
          <span>Publicaciones</span>
          <strong>15</strong>
        </div>
      </div>
    </div>
  );
}
