import { createBrowserRouter } from 'react-router';

import Layout from '@/layouts/common/Layout';
import LoginPage from '@/pages/login';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: LoginPage },
      { path: 'routine', Component }
    ],
  },
]);

export default router;
