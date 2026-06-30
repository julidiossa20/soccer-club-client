import { Camera } from 'lucide-react';
import type { AuthUser } from '../../../../../../store/slices/authSlice';
import styles from './avatar.module.css';

interface AvatarProps {
  setShowAvatarSelector: React.Dispatch<React.SetStateAction<boolean>>;
  user: AuthUser;
}

export default function Avatar({ user, setShowAvatarSelector }: AvatarProps) {
  const getAvatarFallback = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff&size=256`;
  };

  const currentAvatar = user.avatar || getAvatarFallback(user.name);

  return (
    <div className={styles.avatar}>
      <img src={currentAvatar} alt='Profile' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div
        onClick={() => setShowAvatarSelector((preState) => !preState)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShowAvatarSelector((preState) => !preState);
          }
        }}
        role='button'
        tabIndex={0}
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'rgba(0,0,0,0.5)',
          padding: '5px',
          color: 'white',
          cursor: 'pointer',
        }}>
        <Camera size={20} style={{ margin: '0 auto' }} />
      </div>
    </div>
  );
}
