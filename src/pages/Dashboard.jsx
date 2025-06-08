import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PermissionsList from '../components/PermissionsList';

const Dashboard = () => {
  const { user } = useAuth();
  const { permissions } = user;

  return (
    <section>
      <h2 className="text-2xl font-bold">Bienvenido, {user.user.nombre}</h2>
      <p>¿Qué desea hacer?</p>

      <PermissionsList permissions={permissions} />
    </section>
  );
};
export default Dashboard;
