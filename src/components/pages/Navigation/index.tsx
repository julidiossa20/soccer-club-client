import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../views/Footer';
import Header from '../../views/Header';
import styles from './navigation.module.css';

export default function Navigation({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.navigation}>
      <header className={styles.navigation__header}>
        <Header />
      </header>
      <main className={styles.navigation__main}>{children ?? <Outlet />}</main>
      <footer className={styles.navigation__footer}>
        <Footer />
      </footer>
    </div>
  );
}
