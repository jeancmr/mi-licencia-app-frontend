import { useState, useEffect } from 'react';
import { getClasses } from '../api/classes';
import { showAlert } from '../utils/alertMessage';
import { ENROLLMENT_MESSAGES } from '../constants/messages';

const API_URL = import.meta.env.VITE_API_URL;

export const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await getClasses(`${API_URL}/clases`);
      setClasses(response);
    } catch (error) {
      console.error('Error fetching classes:', error);
      showAlert('Error', ENROLLMENT_MESSAGES.ERRORS.FETCH_CLASSES_ERROR, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return {
    classes,
    isLoading,
    fetchClasses
  };
}; 