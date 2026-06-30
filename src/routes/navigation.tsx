import AdminPlaceholder from '../components/pages/Admin/Placeholder';
import Navigation from '../components/pages/Navigation';
import Home from '../components/pages/Navigation/Home';
import Profile from '../components/pages/Profile';
import { profileAction } from '../components/pages/Profile/profileAction';
import { profileLoader } from '../components/pages/Profile/profileLoader';
import MatchProgrammingPublic from '../components/pages/Public/MatchProgramming';
import PlayerDetail from '../components/pages/Public/PlayerDetail';
import PublicPlayers from '../components/pages/Public/Players';
import PublicTeams from '../components/pages/Public/Teams';

const navigation = {
  path: '/',
  element: <Navigation />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: 'profile',
      loader: profileLoader,
      action: profileAction,
      element: <Profile />,
    },
    {
      path: 'equipos',
      element: <PublicTeams />,
    },
    {
      path: 'jugadores',
      element: <PublicPlayers />,
    },
    {
      path: 'jugadores/:id',
      element: <PlayerDetail />,
    },
    {
      path: 'programacion',
      element: <MatchProgrammingPublic />,
    },
    {
      path: 'noticias',
      element: <AdminPlaceholder title='Blog de Noticias' />,
    },
  ],
};

export default navigation;
