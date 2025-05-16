import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <nav className="flex list-none justify-around">
      <li className="">
        <Link to={'/'}>mi-licencia</Link>
      </li>
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login" onClick={isAuthenticated && signOut}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
