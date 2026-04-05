import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/pages/Navigation/Home';

import NotFound from './components/NotFound/NotFound';

import Auth from '../components/pages/Auth';
import { authLoader } from '../components/pages/Auth/authLoader';
import Change from '../components/pages/Auth/Change';
import { changeAction } from '../components/pages/Auth/Change/changeAction';
import Login from '../components/pages/Auth/Login';
import { loginAction } from '../components/pages/Auth/Login/loginAction';
import Register from '../components/pages/Auth/Register';
import { registerAction } from '../components/pages/Auth/Register/registerAction';
import Reset from '../components/pages/Auth/Reset';
import { resetAction } from '../components/pages/Auth/Reset/resetAction';
import Navigation from '../components/pages/Navigation';
import Profile from '../components/pages/Profile';
import RootExecutor from './components/RootExecutor';
import loaderRoot from './components/RootExecutor/loaderRoot';

// Admin Imports
import AdminLayout from '../components/pages/Admin/AdminLayout';
import { adminLoader } from '../components/pages/Admin/adminLoader';
import AdminDashboard from '../components/pages/Admin/Dashboard';
import AdminUsers from '../components/pages/Admin/Users';
import AdminTeams from '../components/pages/Admin/Teams';
import AdminPlayers from '../components/pages/Admin/Players';
import AdminMatches from '../components/pages/Admin/Matches';
import AdminNews from '../components/pages/Admin/News';
import AdminSiteEditor from '../components/pages/Admin/SiteEditor';

const router = createBrowserRouter([
  {
    element: <RootExecutor />,
    loader: loaderRoot,
    children: [
      {
        path: '/',
        element: <Navigation />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
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
            path: 'partidos',
            element: <AdminMatches />,
          },
          {
            path: 'noticias',
            element: <AdminNews />,
          },
          {
            path: 'site-editor',
            element: <AdminSiteEditor />,
          },
        ],
      },
      {
        path: '/auth',
        element: <Auth />,
        loader: authLoader,
        children: [
          {
            path: 'login',
            action: loginAction,
            element: <Login />,
          },
          {
            path: 'register',
            action: registerAction,
            element: <Register />,
          },
          {
            path: 'change',
            action: changeAction,
            element: <Change />,
          },
          {
            path: 'reset',
            action: resetAction,
            element: <Reset />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
