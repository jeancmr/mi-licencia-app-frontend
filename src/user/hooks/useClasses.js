import { useState, useEffect } from 'react';
import { getClasses, removeClass } from '../api/classes';
import { ENROLLMENT_MESSAGES } from '../constants/messages';
import { showAlert, showConfirmation } from '../../utils/alertMessage';

const API_URL = import.meta.env.VITE_API_URL;

export const useClasses = (userType = 'general', userId = null, filterToday = false) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      let url = `${API_URL}/clases`;

      // If it's a professor, fetch their assigned classes
      if (userType === 'professor' && userId) {
        url = `${API_URL}/clases/professor/${userId}`;
      }

      const response = await getClasses(url);
      let filteredClasses = response;

      // Filter for today's classes if needed (for attendance)
      if (filterToday) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const todayDate = `${month}/${day}/${year}`;

        filteredClasses = response.filter((clase) => clase.fecha === todayDate);
      }

      setClasses(filteredClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
      showAlert('Error', ENROLLMENT_MESSAGES.ERRORS.FETCH_CLASSES_ERROR, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClass = async (classId) => {
    try {
      setIsLoading(true);
      const result = await showConfirmation(
        '¿Seguro que deseas eliminar la clase?',
        'Esta acción no se puede deshacer',
        'warning'
      );

      if (result.isConfirmed) {
        await removeClass(classId);
        showAlert('Success', 'Clase eliminada correctamente', 'success');
        fetchClasses();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing class:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [userType, userId, filterToday]);

  return {
    classes,
    isLoading,
    fetchClasses,
    onRemoveClass: handleRemoveClass,
  };
};
