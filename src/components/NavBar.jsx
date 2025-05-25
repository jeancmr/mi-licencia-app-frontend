import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <nav className="max-w-7xl mx-auto flex h-16 list-none flex justify-between items-center">
      <li className="">
        <Link to={'/'}>mi-licencia</Link>
      </li>
      <ul className="flex gap-4">
        {
          isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li>
                <button onClick={signOut} className='cursor-pointer'>Cerrar sesión</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  );
};
export default NavBar;
