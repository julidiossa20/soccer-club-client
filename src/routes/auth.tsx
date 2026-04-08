import Auth from '../components/pages/Auth';
import { authLoader } from '../components/pages/Auth/authLoader';
import Change from '../components/pages/Auth/Change';
import { changeAction } from '../components/pages/Auth/Change/changeAction';
import { changeLoader } from '../components/pages/Auth/Change/changeLoader';
import Login from '../components/pages/Auth/Login';
import { loginAction } from '../components/pages/Auth/Login/loginAction';
import Register from '../components/pages/Auth/Register';
import { registerAction } from '../components/pages/Auth/Register/registerAction';
import Reset from '../components/pages/Auth/Reset';
import { resetAction } from '../components/pages/Auth/Reset/resetAction';

export const auth = {
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
      loader: changeLoader,
      action: changeAction,
      element: <Change />,
    },
    {
      path: 'reset',
      action: resetAction,
      element: <Reset />,
    },
  ],
};

export default auth;
