import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';
import { Footer, Main, NavBar } from '../ui/components/';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
export default ProtectedRoute;
