import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/pages/Navigation/Home';

import NotFound from './components/NotFound/NotFound';

import Auth from '../components/pages/Auth';
import Change from '../components/pages/Auth/Change';
import Login from '../components/pages/Auth/Login';
import { authLoader } from '../components/pages/Auth/Login/authLoader';
import { loginAction } from '../components/pages/Auth/Login/loginAction';
import Register from '../components/pages/Auth/Register';
import Reset from '../components/pages/Auth/Reset';
import Navigation from '../components/pages/Navigation';
import RootExecutor from './components/RootExecutor';
import loaderRoot from './components/RootExecutor/loaderRoot';

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
        ],
      },
      {
        path: '/auth',
        element: <Auth />,
        // loader: layoutLoader,
        children: [
          {
            path: 'login',
            loader: authLoader,
            action: loginAction,
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'change',
            element: <Change />,
          },
          {
            path: 'reset',
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
