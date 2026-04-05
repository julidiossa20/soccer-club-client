import { Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import Footer from '../views/Footer';
import Header from '../views/Header';
import { ToastContainer } from '../views/Toast';
import styles from './layout.module.css';

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <Header />
      </header>
      <main className={styles.layout__main}>{children ?? <Outlet />}</main>
      <footer className={styles.layout__footer}>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
}
