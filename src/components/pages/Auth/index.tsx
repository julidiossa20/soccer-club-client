import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './auth.module.css';

export default function Auth({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles['card--wide']}`}>{children ?? <Outlet />}</div>
    </div>
  );
}
