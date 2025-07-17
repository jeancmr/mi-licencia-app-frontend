import { API_URL, get } from '../../auth/api/base';

export const getUsersByRol = async (role) => {
  try {
    const response = await get(`${API_URL}/usuarios/${role}`);
    return response;
  } catch (error) {
    console.error('Error fetched classes', error.message);
  }
};

export const getUsers = async () => {
  try {
    const response = await get(`${API_URL}/usuarios/`);
    return response;
  } catch (error) {
    console.error('Error fetched classes', error.message);
  }
};
