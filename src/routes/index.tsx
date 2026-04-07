import { createBrowserRouter } from 'react-router-dom';
import admin from './admin';
import auth from './auth';
import NotFound from './components/NotFound/NotFound';
import RootExecutor from './components/RootExecutor';
import loaderRoot from './components/RootExecutor/loaderRoot';
import navigation from './navigation';

const router = createBrowserRouter([
  {
    element: <RootExecutor />,
    loader: loaderRoot,
    children: [navigation, admin, auth],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
