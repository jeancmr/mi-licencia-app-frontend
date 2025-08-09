import { API_URL, deleteItem, get, post, update } from '../auth/api/base';

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

export const updateUser = async (id, userData) => {
  try {
    const response = await update(`${API_URL}/usuarios/${id}`, userData);
    return response;
  } catch (error) {
    console.error('Error updating class', error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await deleteItem(`/usuarios/${id}`);
    return response;
  } catch (error) {
    console.error('Error updating class', error.message);
    throw error;
  }
};
