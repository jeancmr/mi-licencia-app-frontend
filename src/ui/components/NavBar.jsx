import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import BurgerButton from './BurgerButton';

const NavBar = () => {
  const { signOut, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="max-w-7xl mx-auto bg-zinc-800 px-4 rounded-md relative">
      {/* Main navbar */}
      <div className="h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="">
          <NavLink to={'/'} className="flex items-center gap-1.5" onClick={closeMenu}>
            <img src="/manage.svg" alt="Logo mi-licencia-app" className="h-8" />
            <span className="text-2xl text-white">MiLicenciaApp</span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4">
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="hover:text-white transition-colors">
                  Perfil
                </NavLink>
              </li>
              <li>
                <button
                  onClick={signOut}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="hover:text-white transition-colors">
                  Iniciar sesión
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-white transition-colors">
                  Registrarse
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Burger Button */}
        <BurgerButton isOpen={isMenuOpen} onToggle={toggleMenu} />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-4 space-y-3 border-t border-zinc-700">
          {isAuthenticated ? (
            <>
              <div>
                <NavLink
                  to="/dashboard"
                  className="block py-2 px-4 hover:bg-zinc-700 rounded transition-colors"
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/profile"
                  className="block py-2 px-4 hover:bg-zinc-700 rounded transition-colors"
                  onClick={closeMenu}
                >
                  Perfil
                </NavLink>
              </div>
              <div>
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="block w-full text-left py-2 px-4 hover:bg-zinc-700 rounded transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <NavLink
                  to="/login"
                  className="block py-2 px-4 hover:bg-zinc-700 rounded transition-colors"
                  onClick={closeMenu}
                >
                  Iniciar sesión
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/register"
                  className="block py-2 px-4 hover:bg-zinc-700 rounded transition-colors"
                  onClick={closeMenu}
                >
                  Registrarse
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
