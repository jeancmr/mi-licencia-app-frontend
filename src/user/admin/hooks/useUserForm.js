import { useState } from 'react';
import { updateUser } from '../../api';
import { showAlert } from '../../../utils/alertMessage';

export const useUserForm = (selectedUser, onUpdateUser) => {
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
      if (selectedUser?.id) {
        const updateUserz = await updateUser(selectedUser.id, formData);
        onUpdateUser(updateUserz);
      } else {
        console.log('Creating new user:', formData);
      }

      showAlert(
        `Usuario ${selectedUser?.id ? 'actualizado' : 'creado'}`,
        `El usuario ha sido ${selectedUser?.id ? 'actualizado' : 'creado'} correctamente`,
        'success'
      );
    } catch (error) {
      console.error('Error submitting user form:', error);
      showAlert('Error', error.message ?? 'Ocurrió un error al guardar el usuario', 'error');
    }
  };

  return {
    formData,
    handleChange,
    onSubmit,
  };
};
