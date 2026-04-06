import { Medal, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { RootState } from '../../../store';
import styles from './header.module.css';

const navLinks = [
  { to: '/', title: 'Home' },
  { to: '/equipos', title: 'Equipos' },
  { to: '/jugadores', title: 'Plantilla' },
  { to: '/programacion', title: 'Programación' },
  { to: '/noticias', title: 'Noticias' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const isAdmin = true;
  // const isAdmin = user?.role === 'admin' || user?.role === 'editor';

  const closeMenu = () => setMenuOpen(false);

  const navClasses = [styles['header__nav-container'], menuOpen && styles['header__nav-container--open']]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={styles.header}>
      <div className={styles.header__logo}>
        <NavLink to='/' onClick={closeMenu} className={styles.header__brand}>
          <Medal size={28} className={styles.header__icon} />
          <span className={styles['header__club-name']}>
            FUTBOL<span style={{ color: 'var(--secondary-color)' }}> CLUB</span>
          </span>
        </NavLink>
      </div>

      <div className={styles.header__nav}>
        <ul className={navClasses}>
          {navLinks.map(({ title, to }) => (
            <li key={title}>
              <NavLink
                to={to}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? styles['header__link--active'] : '')}>
                {title}
              </NavLink>
            </li>
          ))}

          <div className={styles.header__divider} />

          {isAdmin && (
            <li>
              <NavLink to='/admin' onClick={closeMenu} className={styles['header__admin-link']}>
                Panel Admin
              </NavLink>
            </li>
          )}

          {isAuthenticated ? (
            <li>
              <NavLink to='/profile' onClick={closeMenu} className={styles['header__profile-link']}>
                Mi Perfil
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to='/auth/login' onClick={closeMenu} className={styles['header__login-btn']}>
                Iniciar Sesión
              </NavLink>
            </li>
          )}
        </ul>

        <button className={styles['header__menu-btn']} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
