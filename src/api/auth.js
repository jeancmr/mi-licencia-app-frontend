import { get, post } from './base';

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (userData) => {
  try {
    const response = await post(`${API_URL}/register`, userData);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al registrar el usuario');
  }
};

export const login = async (userData) => {
  try {
    const response = await post(`${API_URL}/login`, userData);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al iniciar sesión');
  }
};

export const logout = async () => {
  try {
    const response = await post(`${API_URL}/logout`, {});
    return response;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al cerrar sesión');
  }
};

export const verifyToken = async () => {
  try {
    const response = await get(`${API_URL}/verify`);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al verificar el token');
  }
};
