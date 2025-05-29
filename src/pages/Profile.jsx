import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const {
    user: { user },
  } = useAuth();

  return (
    <section>
      <h1 className="text-2xl font-bold">Perfil</h1>
      <div className="mt-4 text-white">
        <p className="text-lg">Nombre: {user.nombre}</p>
        <p className="text-lg">Email: {user.correo}</p>
        <p className="text-lg">Rol: {user.rol}</p>
      </div>
    </section>
  );
};
export default Profile;
