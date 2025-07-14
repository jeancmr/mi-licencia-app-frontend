import { useEffect, useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({
    message: '',
    color: '',
  });

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert({
          message: '',
          color: '',
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const onAlert = (res) => {
    setAlert({
      message: res ? 'Usuario registrado correctamente' : 'Error al registrar el usuario:',
      color: res ? 'green' : 'red',
    });
  };

  return {
    alert,
    onAlert,
  };
};
