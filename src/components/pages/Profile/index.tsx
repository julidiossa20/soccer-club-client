import { useLoaderData } from 'react-router-dom';
import { useDevice } from '../../../hooks';
import type { AuthState } from '../../../store/slices/authSlice';
import Information from './components/Information';
import Statistics from './components/Statistics';
import styles from './profile.module.css';

export default function Profile() {
  const { user } = useLoaderData<AuthState>();
  if (!user) throw new Error('Para esta ruta se requieren datos de usuario');
  const { isMobile } = useDevice();

  return (
    <div className={`${styles.profile} ${isMobile ? styles.mobile : ''}`}>
      <div className={`${styles.profile__card} ${isMobile ? styles.mobile : ''}`}>
        <div className={`${styles['profile__card-statistics']} ${isMobile ? styles.mobile : ''}`}>
          <Statistics user={user} />
        </div>

        <div className={`${styles['profile__card-information']} ${isMobile ? styles.mobile : ''}`}>
          <Information user={user} />
        </div>
      </div>
    </div>
  );
}
