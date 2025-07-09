import { useState } from 'react';
import { ClassList, Loading } from '../../components';
import { useClasses } from '../../hooks';
import ClassForm from '../../components/ClassForm';

const ClassPage = () => {
  const { classes, isLoading: isLoadingClasses, onRemoveClass } = useClasses();
  const [selectedClass, setSelectedClass] = useState(null);

  const handleRemoveClass = (classId) => {
    onRemoveClass(classId);
    setSelectedClass(null); // Reset selected class after removal
  };

  const handleSelectedClass = (classData) => {
    setSelectedClass(classData);
  };

  if (isLoadingClasses) {
    return <Loading />;
  }

  return (
    <div className="space-y-4 pr-2 flex-1 overflow-y-auto relative">
      {selectedClass ? (
        <ClassForm selectedClass={selectedClass} onRemoveClass={handleRemoveClass} />
      ) : (
        <ClassList classes={classes} handleClaseClick={handleSelectedClass} />
      )}
    </div>
  );
};
export default ClassPage;
