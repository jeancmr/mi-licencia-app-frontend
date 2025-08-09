import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const NavBar = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <nav className="max-w-7xl mx-auto h-16 list-none flex justify-between items-center  bg-zinc-800 px-4 rounded-md">
      <li className="">
        <NavLink to={'/'} className="flex items-center gap-1.5">
          <img src="/manage.svg" alt="Logo mi-licencia-app" className="h-8" />
          <span className="text-2xl text-white">MiLicenciaApp</span>
        </NavLink>
      </li>
      <ul className="flex gap-4">
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Perfil</NavLink>
            </li>
            <li>
              <button onClick={signOut} className="cursor-pointer">
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Iniciar sesión</NavLink>
            </li>
            <li>
              <NavLink to="/register">Registrarse</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
