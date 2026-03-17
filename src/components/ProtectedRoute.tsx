import { Navigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <>{children}</>;
}
