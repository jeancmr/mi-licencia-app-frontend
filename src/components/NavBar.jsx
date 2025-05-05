import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {isAuthenticated ? (
        <li>
          <Link onClick={signOut} to="/login">
            Login
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
};
export default NavBar;
