import { Medal, Menu, Tornado } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDevice } from '../../../hooks';
import type { RootState } from '../../../store';
import styles from './header.module.css';

const nav = ({ isAdmin, isAuthenticated }: { isAdmin: boolean; isAuthenticated: boolean }) => {
  return [
    { to: '/', title: 'Home', visible: true },
    { to: '/teams', title: 'Equipo', visible: true },
    { to: '/news', title: 'Noticias', visible: true },
    { to: '/admin', title: 'Admin', visible: isAdmin },
    { to: '/profile', title: 'Perfil', visible: isAuthenticated },
    { to: '/login', title: 'Login', visible: !isAuthenticated },
  ];
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isMobile } = useDevice();

  const closeMenu = () => setMenuOpen(false);
  const navClasses = [styles['header__nav-container'], isMobile && styles.mobile, menuOpen && styles.open]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Link to='/' onClick={closeMenu}>
          <h2>
            <Medal size={25} />
          </h2>
        </Link>
      </div>
      <div className={styles.header__nav}>
        {isMobile && (
          <button className={`${styles['header__nav-menu--button']}`} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <Tornado /> : <Menu />}
          </button>
        )}
        <ul className={navClasses}>
          {nav({ isAdmin: true, isAuthenticated }).map(
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
