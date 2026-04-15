import {
  Award,
  BarChart3,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Edit3,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Newspaper,
  ShieldAlert,
  Trophy,
  UserCircle,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { logout, type AuthUser } from '../../../store/slices/authSlice';
import styles from './AdminLayout.module.css';

interface NavItem {
  path?: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
  children?: { path: string; label: string; icon: React.ReactNode }[];
}

const navItems: NavItem[] = [
  { path: '/admin', label: 'Inicio', icon: <LayoutDashboard size={20} />, end: true },
  {
    label: 'Club',
    icon: <Trophy size={20} />,
    children: [
      { path: '/admin/equipos', label: 'Equipos', icon: <Trophy size={16} /> },
      { path: '/admin/jugadores', label: 'Jugadores', icon: <UserCircle size={16} /> },
      { path: '/admin/entrenadores', label: 'Cuerpo Técnico', icon: <Users size={16} /> },
      { path: '/admin/historia', label: 'Historia', icon: <History size={16} /> },
    ],
  },
  {
    label: 'Competición',
    icon: <Award size={20} />,
    children: [
      { path: '/admin/ligas', label: 'Ligas', icon: <ShieldAlert size={16} /> },
      { path: '/admin/temporadas', label: 'Temporadas', icon: <Calendar size={16} /> },
      { path: '/admin/partidos', label: 'Calendario', icon: <Calendar size={16} /> },
      { path: '/admin/planeacion-partidos', label: 'Planeación', icon: <ClipboardList size={16} /> },
      { path: '/admin/posiciones', label: 'Posiciones', icon: <BarChart3 size={16} /> },
    ],
  },
  {
    label: 'Contenido',
    icon: <Newspaper size={20} />,
    children: [
      { path: '/admin/noticias', label: 'Noticias', icon: <Newspaper size={16} /> },
      { path: '/admin/patrocinadores', label: 'Patrocinadores', icon: <Briefcase size={16} /> },
      { path: '/admin/media', label: 'Galería', icon: <ImageIcon size={16} /> },
    ],
  },
  {
    label: 'Ajustes',
    icon: <Edit3 size={20} />,
    children: [
      { path: '/admin/usuarios', label: 'Usuarios', icon: <Users size={16} /> },
      { path: '/admin/site-editor', label: 'Editor Visual', icon: <Edit3 size={16} /> },
    ],
  },
];

export default function AdminLayout() {
  const { name } = useLoaderData<AuthUser>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<string[]>(['Club']);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => (prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]));
  };

  const handleLogout = () => {
    dispatch(logout());
    void navigate('/');
  };

  return (
    <div className={styles.admin}>
      <aside className={styles.admin__sidebar}>
        <NavLink to={'/'} className={styles['admin__sidebar-header']}>
          <h3>FUTBOL CLUB</h3>
          <p>Gestión Deportiva</p>
        </NavLink>

        <nav className={styles['admin__sidebar-nav']}>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.path ? (
                  <NavLink
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) => (isActive ? styles['admin__link--active'] : '')}>
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ) : (
                  <div className={styles['admin__nav-group']}>
                    <button className={styles['admin__nav-toggle']} onClick={() => toggleMenu(item.label)}>
                      <div className={styles['admin__nav-toggle-label']}>
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {openMenus.includes(item.label) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {openMenus.includes(item.label) && (
                      <ul className={styles['admin__nav-sub']}>
                        {item.children?.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) => (isActive ? styles['admin__link--active'] : '')}>
                              {child.icon}
                              <span>{child.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
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
            <span>Admin Dashboard</span>
          </div>
          <div className={styles['admin__user-info']}>
            <div className={styles['admin__user-avatar']}>
              {name.split(' ')[0][0].toUpperCase()}
              {name.split(' ')[1][0].toUpperCase()}
            </div>
            <span>{name.split(' ')[0]}</span>
          </div>
        </header>

        <div className={styles['admin__content-area']}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
