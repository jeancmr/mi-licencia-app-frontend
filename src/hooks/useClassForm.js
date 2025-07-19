import { useEffect, useState } from 'react';
import { createClass, updateClass, getAsignatures, getUsersByRol } from '../api';
import { formateClassData, showAlert } from '../utils';

const API_URL = import.meta.env.VITE_API_URL;

export const useClassForm = (selectedClass, onRefreshClasses) => {
  const [professors, setProfessors] = useState([]);
  const [asignatures, setAsignatures] = useState([]);

  const [formData, setFormData] = useState({
    fecha: selectedClass?.originalDate || '',
    profesorId: selectedClass?.profesorId || '',
    materiaId: selectedClass?.materiaId || '',
    aula: selectedClass?.aula || '',
    horaInicio: selectedClass?.horaInicio || '',
    horaFin: selectedClass?.horaFin || '',
    cuposMaximos: selectedClass?.cuposMaximos || 0,
  });

  const getProfessors = async () => {
    try {
      const data = await getUsersByRol('professors');
      setProfessors(data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const getAllAsignatures = async () => {
    try {
      const data = await getAsignatures();
      setAsignatures(data);
    } catch (error) {
      console.error('Error fetching asignatures:', error);
    }
  };

  useEffect(() => {
    getProfessors();
    getAllAsignatures();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'cuposMaximos' && value < 0) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formattedData = formateClassData(formData);
    try {
      if (selectedClass?.id) {
        await updateClass(`${API_URL}/clases/${selectedClass.id}`, formattedData);
      } else {
        await createClass(`${API_URL}/clases`, formattedData);
      }

      onRefreshClasses();
      showAlert(
        `Clase ${selectedClass?.id ? 'actualizada' : 'creada'}`,
        `La clase ha sido ${selectedClass?.id ? 'actualizada' : 'creada'} correctamente`,
        'success'
      );
    } catch (error) {
      console.error('Error submitting class form:', error);
      showAlert('Error', error.message ?? 'Ocurrió un error al guardar la clase', 'error');
    }
  };

  return {
    formData,
    handleChange,
    professors,
    asignatures,
    signatureName: selectedClass?.materia?.nombre || 'Nueva Clase',
    onSubmit,
  };
};
