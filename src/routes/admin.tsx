import { matchAction } from '../actions/matchAction';
import AdminLayout from '../components/pages/Admin/AdminLayout';
import { adminLoader } from '../components/pages/Admin/adminLoader';
import AdminDashboard from '../components/pages/Admin/Dashboard';
import AdminLeagues from '../components/pages/Admin/Leagues';
import AdminMatches from '../components/pages/Admin/Matches';
import MatchPlanning from '../components/pages/Admin/MatchPlanning';
import AdminNews from '../components/pages/Admin/News';
import AdminPlaceholder from '../components/pages/Admin/Placeholder';
import AdminPlayers from '../components/pages/Admin/Players';
import AdminSeasons from '../components/pages/Admin/Seasons';
import AdminSiteEditor from '../components/pages/Admin/SiteEditor';
import AdminTeams from '../components/pages/Admin/Teams';
import AdminUsers from '../components/pages/Admin/Users';

const admin = {
  path: '/admin',
  element: <AdminLayout />,
  loader: adminLoader,
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    {
      path: 'usuarios',
      element: <AdminUsers />,
    },
    {
      path: 'equipos',
      element: <AdminTeams />,
    },
    {
      path: 'jugadores',
      element: <AdminPlayers />,
    },
    {
      path: 'entrenadores',
      element: <AdminPlaceholder title='Cuerpo Técnico' />,
    },
    {
      path: 'historia',
      element: <AdminPlaceholder title='Historia del Club' />,
    },
    {
      path: 'ligas',
      element: <AdminLeagues />,
    },
    {
      path: 'temporadas',
      element: <AdminSeasons />,
    },
    {
      path: 'partidos',
      element: <AdminMatches />,
    },
    {
      path: 'planeacion-partidos',
      action: matchAction,
      element: <MatchPlanning />,
    },
    {
      path: 'posiciones',
      element: <AdminPlaceholder title='Tablas de Posiciones' />,
    },
    {
      path: 'noticias',
      element: <AdminNews />,
    },
    {
      path: 'patrocinadores',
      element: <AdminPlaceholder title='Gestión de Patrocinadores' />,
    },
    // {
    //   path: 'media',
    //   element: <AdminMedia />,
    // },
    {
      path: 'site-editor',
      element: <AdminSiteEditor />,
    },
  ],
};

export default admin;
