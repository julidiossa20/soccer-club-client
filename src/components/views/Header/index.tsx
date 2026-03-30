import { Link } from 'react-router-dom';
import { useDevice } from '../../../hooks';
import styles from './header.module.css';
import { useState } from 'react';

const nav = ({ isAdmin, isAuthenticated }: { isAdmin: boolean; isAuthenticated: boolean }) => {
  return [
    { to: '/', title: 'Home', visible: true },
    { to: '/teams', title: 'Equipo', visible: true },
    { to: '/news', title: 'Noticias', visible: true },
    { to: '/admin', title: 'Noticias', visible: isAdmin },
    { to: '/profile', title: 'Perfil', visible: isAuthenticated },
    { to: '/login', title: 'Login', visible: !isAuthenticated },
  ];
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isMobile } = useDevice();

  const closeMenu = () => setMenuOpen(false);
  const navClasses = [styles['header__nav-container'], isMobile && styles.mobile, menuOpen && styles.open]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Link to='/' onClick={closeMenu}>
          <h2>CLUB</h2>
        </Link>
      </div>
      <div className={styles.header__nav}>
        {isMobile && (
          <button className={`${styles['header__nav-menu--button']}`} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        )}
        <ul className={navClasses}>
          {nav({ isAdmin: false, isAuthenticated: false }).map(
            ({ title, to, visible }) =>
              visible && (
                <li key={title}>
                  <Link to={to} onClick={closeMenu}>
                    {title}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
}
