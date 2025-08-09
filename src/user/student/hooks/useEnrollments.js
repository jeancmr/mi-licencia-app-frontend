import { useState, useEffect } from 'react';
import { deleteEnrollment, generateEnrollment, getEnrollments } from '../api';
import { showAlert, showConfirmation } from '../../../utils/alertMessage';

const API_URL = import.meta.env.VITE_API_URL;

export const useEnrollments = (userId) => {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEnrollments = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const data = await getEnrollments(`${API_URL}/inscripciones/estudiante/${userId}`);
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      showAlert('Error', 'Error al obtener las inscripciones', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const createEnrollment = async (enrollmentData) => {
    try {
      await generateEnrollment(`${API_URL}/inscripciones`, enrollmentData);
      showAlert('Inscripción exitosa', 'Has sido inscrito/a en la clase correctamente.', 'success');
      await fetchEnrollments();
      return true;
    } catch (error) {
      console.error('Error al inscribir la clase:', error);
      showAlert('Error', error.message, 'error');
      return false;
    }
  };

  const removeEnrollment = async (enrollmentId) => {
    try {
      const result = await showConfirmation(
        '¿Seguro que deseas eliminar la inscripción?',
        'Esta acción no se puede deshacer',
        'warning'
      );

      if (result.isConfirmed) {
        await deleteEnrollment(`${API_URL}/inscripciones/${enrollmentId}`);
        showAlert(
          'Inscripción eliminada',
          'La inscripción se ha eliminado correctamente.',
          'success'
        );
        await fetchEnrollments();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al eliminar la inscripción:', error);
      showAlert('Error', error.message, 'error');
      return false;
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [userId]);

  return {
    enrollments,
    isLoading,
    fetchEnrollments,
    createEnrollment,
    removeEnrollment,
  };
};
