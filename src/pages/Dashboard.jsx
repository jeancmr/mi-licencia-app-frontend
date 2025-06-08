import { useAuth } from '../context/AuthContext';
import UserOptions from '../components/UserOptions';

const Dashboard = () => {
  const { user } = useAuth();
  const { permissions } = user;

  return (
    <section>
      <h2 className="text-2xl font-bold">Bienvenido, {user.user.nombre}</h2>
      <p>¿Qué desea hacer?</p>

      <UserOptions options={permissions} />
    </section>
  );
};
export default Dashboard;
