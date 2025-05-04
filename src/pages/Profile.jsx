import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const {
    user: { user },
  } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Perfil</h1>

        <div className="mt-4 text-white">
          <p className="text-lg">Nombre: {user.nombre}</p>
          <p className="text-lg">Email: {user.correo}</p>
          <p className="text-lg">Rol: {user.rol}</p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
