import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton, Button, ClassForm, ClassList, Loading } from '../../../components';
import { useClasses } from '../../../hooks';

const ManageClassPage = () => {
  const { classes, isLoading: isLoadingClasses, onRemoveClass, fetchClasses } = useClasses();
  const [selectedClass, setSelectedClass] = useState(null);
  const [openClassForm, setOpenClassForm] = useState(false);
  const navigate = useNavigate();

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
          onRefreshClasses={fetchClasses}
        />
      ) : (
        <>
          <BackButton onGoBack={() => navigate(-1)} />

          <header className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Administrar Clases</h1>
          </header>
          <ClassList
            classes={classes}
            handleClaseClick={handleSelectedClass}
            showProfessor={true}
          />

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
export default ManageClassPage;
