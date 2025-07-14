import { get, deleteItem, post, update } from '../../auth/api/base';

export const getClasses = async (url) => {
  try {
    const response = await get(url);

    return response.data?.map((clase) => ({
      ...clase,
      fecha: new Date(clase.fecha).toLocaleDateString(),
      originalDate: clase.fecha.split('T')[0],
    }));
  } catch (error) {
    console.error('Error fetched classes', error.message);
  }
};

export const removeClass = async (classId) => {
  try {
    const response = await deleteItem(`/clases/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing class', error.message);
    throw error;
  }
};

export const createClass = async (url, classData) => {
  try {
    const response = await post(url, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class', error.message);
    throw error;
  }
};

export const updateClass = async (url, classData) => {
  try {
    const response = await update(url, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class', error.message);
    throw error;
  }
};
