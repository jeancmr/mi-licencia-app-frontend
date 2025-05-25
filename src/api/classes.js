export const getClasses = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    const dataFormatted = data?.map((clase) => ({
      ...clase,
      fecha: new Date(clase.fecha).toLocaleDateString(),
    }));
    return dataFormatted;
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
};
