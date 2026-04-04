import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import NotFound from './components/NotFound/NotFound';
import Register from '../components/pages/Register';
import ProtectedAuth from './components/ProtectedAuth';

const Auth = {
  path: '/',
  element: <ProtectedAuth />,
  children: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: 'registro',
      element: <Register />,
    },
    // {
    //   path: 'reset',
    //   element: <Reset />,
    // },
    // {
    //   path: 'change',
    //   element: <Change />,
    // },
  ],
};

// const Feature = [
// 	{
// 		path: '/',
// 		element: (
// 			<Layout>
// 				<Home />
// 			</Layout>
// 		),
// 	},
// 	{ path: '*', element: <NotFound /> },
// ];

// const Dash = {
// 	path: '/',
// 	element: <ProtectedDash />,
// 	children: [
// 		{
// 			path: '/dashboard',
// 			element: (
// 				<Layout>
// 					<Dashboard />
// 				</Layout>
// 			),
// 		},
// 	],
// };

const Feature = [
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
];

const router = createBrowserRouter([...Feature, Auth, { path: '*', element: <NotFound /> }]);
export default router;
