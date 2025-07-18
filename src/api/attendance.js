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

export const generateAttendance = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};
