export const get = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const post = async (url, requestData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
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
