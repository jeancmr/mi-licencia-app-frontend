import { useState, useEffect } from 'react';
import { getEnrollments, deleteEnrollment, generateEnrollment } from '../api/enrollment';
import { showAlert, showConfirmation } from '../../utils/alertMessage';
import { ENROLLMENT_MESSAGES } from '../constants/messages';

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
      showAlert('Error', ENROLLMENT_MESSAGES.ERRORS.FETCH_ENROLLMENTS_ERROR, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const createEnrollment = async (enrollmentData) => {
    try {
      await generateEnrollment(`${API_URL}/inscripciones`, enrollmentData);
      showAlert(
        ENROLLMENT_MESSAGES.SUCCESS.ENROLLMENT_CREATED,
        ENROLLMENT_MESSAGES.SUCCESS.ENROLLMENT_CREATED_DESCRIPTION,
        'success'
      );
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
        ENROLLMENT_MESSAGES.CONFIRMATIONS.DELETE_ENROLLMENT_TITLE,
        ENROLLMENT_MESSAGES.CONFIRMATIONS.DELETE_ENROLLMENT_DESCRIPTION,
        'warning'
      );

      if (result.isConfirmed) {
        await deleteEnrollment(`${API_URL}/inscripciones/${enrollmentId}`);
        showAlert(
          ENROLLMENT_MESSAGES.SUCCESS.ENROLLMENT_DELETED,
          ENROLLMENT_MESSAGES.SUCCESS.ENROLLMENT_DELETED_DESCRIPTION,
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
