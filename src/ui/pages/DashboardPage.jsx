import { useAuth } from '../../auth/hooks/useAuth';
import { UserOptions } from '../components/';

const DashboardPage = () => {
  const { user } = useAuth();
  const { permissions, nombre } = user;

  return (
    <section>
      <h2 className="text-2xl font-bold">Bienvenido, {nombre}</h2>
      <p>¿Qué desea hacer?</p>

      <UserOptions options={permissions} />
    </section>
  );
};
export default DashboardPage;
