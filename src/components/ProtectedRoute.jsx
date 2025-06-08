import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Main from './shared/Main';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Main>
      <Outlet />
    </Main>
  );
};
export default ProtectedRoute;
