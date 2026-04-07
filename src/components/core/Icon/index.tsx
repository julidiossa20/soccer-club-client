import type { ReactNode } from 'react';
import styles from './icon.module.css';

interface LogoProps {
  logo: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function Icon({ logo, subtitle, title }: LogoProps) {
  return (
    <div className={styles.icon}>
      <div className={styles.icon__logo}>{logo}</div>
      <h2 className={styles.icon__title}>{title}</h2>
      <p className={styles.icon__subtitle}>{subtitle}</p>
    </div>
  );
}
