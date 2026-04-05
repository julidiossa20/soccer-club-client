import {
  LayoutDashboard,
  Users,
  Trophy,
  UserCircle,
  Calendar,
  Newspaper,
  Edit3,
  LogOut,
  ClipboardList,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const navItems = [
  { path: '/admin', label: 'Inicio', icon: <LayoutDashboard size={20} />, end: true },
  { path: '/admin/usuarios', label: 'Usuarios', icon: <Users size={20} /> },
  { path: '/admin/equipos', label: 'Equipos', icon: <Trophy size={20} /> },
  { path: '/admin/jugadores', label: 'Jugadores', icon: <UserCircle size={20} /> },
  { path: '/admin/partidos', label: 'Partidos', icon: <Calendar size={20} /> },
  { path: '/admin/noticias', label: 'Noticias', icon: <Newspaper size={20} /> },
  { path: '/admin/site-editor', label: 'Editor Visual', icon: <Edit3 size={20} /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    void navigate('/auth/login');
  };

  return (
    <div className={styles.admin}>
      <aside className={styles.admin__sidebar}>
        <div className={styles['admin__sidebar-header']}>
          <h3>FUTBOL CLUB</h3>
          <p>Admin Panel</p>
        </div>

        <nav className={styles['admin__sidebar-nav']}>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => (isActive ? styles['admin__link--active'] : '')}>
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles['admin__sidebar-footer']}>
          <button onClick={handleLogout} className={styles.admin__logout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className={styles.admin__main}>
        <header className={styles['admin__main-header']}>
          <div className={styles.admin__breadcrumb}>
            <ClipboardList size={20} />
            <span>Gestión Deportiva</span>
          </div>
          <div className={styles['admin__user-info']}>
            <span>Admin Juan</span>
          </div>
        </header>

        <div className={styles['admin__content-area']}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
