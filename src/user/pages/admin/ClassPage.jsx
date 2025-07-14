import { useState } from 'react';
import { Button, ClassList, Loading } from '../../components';
import { useClasses } from '../../hooks';
import ClassForm from '../../components/ClassForm';

const ClassPage = () => {
  const { classes, isLoading: isLoadingClasses, onRemoveClass } = useClasses();
  const [selectedClass, setSelectedClass] = useState(null);
  const [openClassForm, setOpenClassForm] = useState(false);

  const handleRemoveClass = (classId) => {
    onRemoveClass(classId);
    setSelectedClass(null);
    setOpenClassForm(false);
  };

  const handleSelectedClass = (classData) => {
    setSelectedClass(classData);
    setOpenClassForm(true);
  };

  const handleGoBack = () => {
    setSelectedClass(null);
    setOpenClassForm(false);
  };

  if (isLoadingClasses) {
    return <Loading />;
  }

  return (
    <div className="space-y-4 pr-2 flex-1 overflow-y-auto relative">
      {openClassForm ? (
        <ClassForm
          selectedClass={selectedClass}
          onRemoveClass={handleRemoveClass}
          onGoBack={handleGoBack}
        />
      ) : (
        <>
          <ClassList classes={classes} handleClaseClick={handleSelectedClass} />

          <div className="sticky bottom-0">
            <Button onClick={() => setOpenClassForm(!openClassForm)} className="w-full mt-0">
              Registrar clase
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default ClassPage;
