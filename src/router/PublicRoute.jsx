import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
