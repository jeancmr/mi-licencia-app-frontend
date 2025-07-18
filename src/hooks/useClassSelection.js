import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { showAlert } from '../utils';
import { ENROLLMENT_MESSAGES } from '../user/student/constants/messages';

export const useClassSelection = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const selectClass = (classData) => {
    setSelectedClassId(classData.id);
    setValue('claseId', classData.id);
  };

  const clearSelection = () => {
    setSelectedClassId(null);
    setValue('claseId', null);
    reset();
  };

  const createSubmitHandler = (onSubmitCallback) => {
    return handleSubmit(
      async (data) => {
        await onSubmitCallback(data);
        clearSelection();
      },
      (errors) => {
        console.log('Form errors:', errors);
        if (errors.claseId) {
          showAlert('Error', ENROLLMENT_MESSAGES.ERRORS.MUST_SELECT_CLASS, 'error');
        }
      }
    );
  };

  return {
    selectedClassId,
    selectClass,
    clearSelection,
    register,
    createSubmitHandler,
    formErrors: errors,
  };
};
