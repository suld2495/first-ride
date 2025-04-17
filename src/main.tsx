import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import QueryProvider from './components/providers/QueryProvider.tsx';
import router from './router/index.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>,
);
