import { API_URL, get } from '../auth/api/base';

export const getAsignatures = async () => {
  try {
    const response = await get(`${API_URL}/materias/`);
    return response;
  } catch (error) {
    console.error('Error fetched classes', error.message);
  }
};
