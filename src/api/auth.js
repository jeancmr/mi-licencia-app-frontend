const API_URL = import.meta.env.VITE_API_URL;

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ocurrió un error');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al registrar el usuario');
  }
};
export const login = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ocurrió un error');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al iniciar sesión');
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ocurrió un error al cerrar sesión');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al cerrar sesión');
  }
};

export const verifyToken = async () => {
  try {
    const response = await fetch(`${API_URL}/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ocurrió un error');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Ocurrió un error al verificar el token');
  }
};
