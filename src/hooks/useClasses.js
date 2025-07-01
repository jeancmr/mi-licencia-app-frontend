import { useState, useEffect } from 'react';
import { getClasses } from '../api/classes';
import { showAlert } from '../utils/alertMessage';
import { ENROLLMENT_MESSAGES } from '../constants/messages';

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

  useEffect(() => {
    fetchClasses();
  }, [userType, userId, filterToday]);

  return {
    classes,
    isLoading,
    fetchClasses,
  };
};
