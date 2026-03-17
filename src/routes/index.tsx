import { createBrowserRouter, Navigate } from 'react-router';
import AccountListPage from '../pages/AccountListPage';
import AccountDetailPage from '../pages/AccountDetailPage';

export const router = createBrowserRouter([
  {
    path: '/accounts',
    element: <AccountListPage />,
  },
  {
    path: '/accounts/:id',
    element: <AccountDetailPage />,
  },
  {
    path: '*',
    element: <Navigate to="/accounts" />,
  },
]);
