import { createContext, useContext, useEffect, useState } from 'react';
import { login, verifyToken } from '../api/auth';
import { rolePermissions } from '../utils/permissions';
import { set } from 'react-hook-form';

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
  const [loading, setLoading] = useState(true);

  const signIn = async (userData) => {
    try {
      const res = await login(userData);
      console.log('Usuario:', res);
      const permissions = rolePermissions[res.user.rol] || [];
      setUser({ ...res, permissions });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const verify = async () => {
    try {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
