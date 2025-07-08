import { get } from '../../auth/api/base';

export const getClasses = async (url) => {
  try {
    const response = await get(url);

    return response.data?.map((clase) => ({
      ...clase,
      fecha: new Date(clase.fecha).toLocaleDateString(),
    }));
  } catch (error) {
    console.error('Error fetched classes', error.message);
  }
};
