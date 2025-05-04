import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { permissions } = user;

  return (
    <section>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <h2 className="text-2xl font-bold">Bienvenido, {user.user.nombre}</h2>

          <p>¿Qué le gustaría hacer?</p>
          <ul className="list-disc list-inside">
            {permissions.map((item) => (
              <Link to={`/${item.name}`} className="text-blue-500 hover:underline" key={item.id}>
                {item.description}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
