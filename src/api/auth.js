const API_URL = import.meta.env.VITE_API_URL;

export const login = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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
