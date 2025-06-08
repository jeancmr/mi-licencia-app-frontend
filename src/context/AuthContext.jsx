import { createContext, useContext, useEffect, useState } from 'react';
import { login, verifyToken, logout, register } from '../api/auth';
import { rolePermissions } from '../utils/permissions';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = async (userData) => {
    try {
      const res = await register(userData);
      setErrors([]);
      return true;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrors(error.message.split('|'));
      return false;
    }
  };
  const signIn = async (userData) => {
    try {
      const res = await login(userData);
      const permissions = rolePermissions[res.user.rol] || [];

      setUser({ ...res, permissions });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setUser(null);
      setIsAuthenticated(false);
      setErrors(error.message.split('|'));
    }
  };

  const verify = async () => {
    try {
      setIsLoading(true);
      console.log('Verificando token...');
      const res = await verifyToken();
      console.log('Usuario verificado:', res);
      const permissions = rolePermissions[res.user.rol] || [];
      setUser({ ...res, permissions });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al verificar el token:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    const res = await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    verify();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, isAuthenticated, isLoading, user, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
