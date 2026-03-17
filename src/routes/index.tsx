import { createBrowserRouter, Navigate } from 'react-router';
import LoginPage from '../pages/LoginPage';
import AccountListPage from '../pages/AccountListPage';
import AccountCreatePage from '../pages/AccountCreatePage';
import AccountDetailPage from '../pages/AccountDetailPage';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/accounts',
    element: (
      <ProtectedRoute>
        <AccountListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/new',
    element: (
      <ProtectedRoute>
        <AccountCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/:id',
    element: (
      <ProtectedRoute>
        <AccountDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]);
