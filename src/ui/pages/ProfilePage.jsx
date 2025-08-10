import { useAuth } from '../../auth/hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const { nombre, correo, rol } = user;

  return (
    <section>
      <h1 className="text-2xl font-bold">Perfil</h1>
      <div className="mt-4 text-white">
        <p className="text-lg">Nombre: {nombre}</p>
        <p className="text-lg">Email: {correo}</p>
        <p className="text-lg">Rol: {rol}</p>
      </div>
    </section>
  );
};
export default ProfilePage;
