import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Main from './shared/Main';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Main>
        <p>Loading...</p>
      </Main>
    );
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <Main>
      <Outlet />
    </Main>
  );
};
export default ProtectedRoute;
