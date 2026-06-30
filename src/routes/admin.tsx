import { matchAction } from '../actions/matchAction';
import AdminLayout from '../components/pages/Admin/AdminLayout';
import { adminLoader } from '../components/pages/Admin/adminLoader';
import AdminDashboard from '../components/pages/Admin/Dashboard';
import AdminLeagues from '../components/pages/Admin/Leagues';
import { actionLeagues } from '../components/pages/Admin/Leagues/actionLeagues';
import { loaderLeagues } from '../components/pages/Admin/Leagues/loaderLeagues';
import { actionMatches } from '../components/pages/Admin/Matches/actionMatches';
import AdminMatches from '../components/pages/Admin/Matches';
import { loaderMatches } from '../components/pages/Admin/Matches/loaderMatches';
import { loaderMatchPlanning } from '../components/pages/Admin/MatchPlanning/loaderMatchPlanning';
import MatchPlanning from '../components/pages/Admin/MatchPlanning';
import { actionNews } from '../components/pages/Admin/News/actionNews';
import AdminNews from '../components/pages/Admin/News';
import { loaderNews } from '../components/pages/Admin/News/loaderNews';
import AdminPlaceholder from '../components/pages/Admin/Placeholder';
import { actionPlayers } from '../components/pages/Admin/Players/actionPlayers';
import AdminPlayers from '../components/pages/Admin/Players';
import { loaderPlayers } from '../components/pages/Admin/Players/loaderPlayers';
import { actionSeasons } from '../components/pages/Admin/Seasons/actionSeasons';
import AdminSeasons from '../components/pages/Admin/Seasons';
import { loaderSeasons } from '../components/pages/Admin/Seasons/loaderSeasons';
import AdminSiteEditor from '../components/pages/Admin/SiteEditor';
import { actionTeams } from '../components/pages/Admin/Teams/actionTeams';
import AdminTeams from '../components/pages/Admin/Teams';
import { loaderTeams } from '../components/pages/Admin/Teams/loaderTeams';
import { actionUsers } from '../components/pages/Admin/Users/actionUsers';
import AdminUsers from '../components/pages/Admin/Users';
import { loaderUsers } from '../components/pages/Admin/Users/loaderUsers';
import { actionSponsors } from '../components/pages/Admin/Sponsors/actionSponsors';
import AdminSponsors from '../components/pages/Admin/Sponsors';
import { loaderSponsors } from '../components/pages/Admin/Sponsors/loaderSponsors';

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
      loader: loaderUsers,
      action: actionUsers,
    },
    {
      path: 'equipos',
      element: <AdminTeams />,
      loader: loaderTeams,
      action: actionTeams,
    },
    {
      path: 'jugadores',
      element: <AdminPlayers />,
      loader: loaderPlayers,
      action: actionPlayers,
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
      loader: loaderLeagues,
      action: actionLeagues,
    },
    {
      path: 'temporadas',
      element: <AdminSeasons />,
      loader: loaderSeasons,
      action: actionSeasons,
    },
    {
      path: 'partidos',
      element: <AdminMatches />,
      loader: loaderMatches,
      action: actionMatches,
    },
    {
      path: 'planeacion-partidos',
      action: matchAction,
      loader: loaderMatchPlanning,
      element: <MatchPlanning />,
    },
    {
      path: 'posiciones',
      element: <AdminPlaceholder title='Tablas de Posiciones' />,
    },
    {
      path: 'noticias',
      element: <AdminNews />,
      loader: loaderNews,
      action: actionNews,
    },
    {
      path: 'patrocinadores',
      element: <AdminSponsors />,
      loader: loaderSponsors,
      action: actionSponsors,
    },
    {
      path: 'site-editor',
      element: <AdminSiteEditor />,
    },
  ],
};

export default admin;
