import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { permissions } = user;

  return (
    <section>
      <h2 className="text-2xl font-bold">Bienvenido, {user.user.nombre}</h2>

      <p>¿Qué le gustaría hacer?</p>
      <ul className="list-disc list-inside">
        {permissions.map((item) => (
          <Link to={`/${item.name}`} className="text-blue-500 hover:underline" key={item.id}>
            {item.description}
          </Link>
        ))}
      </ul>
    </section>
  );
};
export default Dashboard;
