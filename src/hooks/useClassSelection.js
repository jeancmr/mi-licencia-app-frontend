import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { showAlert } from '../utils';

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
          showAlert('Error', 'Debe seleccionar una clase', 'error');
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
