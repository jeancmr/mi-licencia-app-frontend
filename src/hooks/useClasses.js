import { useState, useEffect } from 'react';
import { getClasses, removeClass } from '../api';
import { filterTodayClasses, showAlert, showConfirmation } from '../utils';
import { ENROLLMENT_MESSAGES } from '../user/student/constants/messages';

const API_URL = import.meta.env.VITE_API_URL;

export const useClasses = (userType = 'general', userId = null, filterToday = false) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      let url = `${API_URL}/clases`;

      if (userType === 'professor' && userId) {
        url = `${API_URL}/clases/professor/${userId}`;
      }

      const response = await getClasses(url);
      let filteredClasses = response;

      if (filterToday) filteredClasses = filterTodayClasses(response);

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
