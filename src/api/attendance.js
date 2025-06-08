export const getAttendances = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    const dataFormatted = data?.map((attendance) => ({
      ...attendance,
      fechaRegistro: new Date(attendance.fechaRegistro).toLocaleDateString(),
      clase: {
        ...attendance.clase,
        fecha: new Date(attendance.clase.fecha).toLocaleDateString(),
      },
    }));
    return dataFormatted;
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
};
