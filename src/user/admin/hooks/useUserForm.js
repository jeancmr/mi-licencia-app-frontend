import { useState } from 'react';
import { showAlert } from '../../../utils';
import { updateUser } from '../../../api';
import { register } from '../../../auth/api/auth';

export const useUserForm = (
  selectedUser = {},
  onUpdateUser = () => {},
  onCreateUser = () => {}
) => {
  const [formData, setFormData] = useState({
    nombre: selectedUser?.nombre || '',
    correo: selectedUser?.correo || '',
    identificacion: selectedUser?.identificacion || '',
    rol: selectedUser?.rol || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let result = null;

      if (selectedUser?.id) {
        result = await updateUser(selectedUser.id, formData);
        onUpdateUser(result);
      } else {
        result = await register(formData);
        onCreateUser(result);
      }

      showAlert(
        `Usuario ${selectedUser?.id ? 'actualizado' : 'creado'}`,
        `El usuario ha sido ${selectedUser?.id ? 'actualizado' : 'creado'} correctamente`,
        'success'
      );
      return { success: true, user: result };
    } catch (error) {
      console.error('Error submitting user form:', error);
      showAlert('Error', error.message ?? 'Ocurrió un error al guardar el usuario', 'error');
      return { success: false };
    }
  };

  return {
    formData,
    handleChange,
    onSubmit,
  };
};
