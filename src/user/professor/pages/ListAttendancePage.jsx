import { useState } from 'react';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useClasses } from '../../../hooks';
import { ClassList } from '../../../components';
import AttendanceForm from '../components/AttendanceForm';

const ListAttendancePage = () => {
  const { user } = useAuth();

  const { classes, isLoading } = useClasses('professor', user.user.id, true);
  const [classSelected, setClassSelected] = useState(null);
  const [openAttendanceForm, setOpenAttendanceForm] = useState(false);
  const [students, setStudents] = useState([]);

  const handleClassSelected = (clase) => {
    setClassSelected(clase);
    setStudents(clase.estudiantes);
    setOpenAttendanceForm(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center">Cargando clases...</div>;
  }

  return (
    <>
      {openAttendanceForm && classSelected ? (
        <AttendanceForm
          classId={classSelected}
          onOpenAttendanceForm={setOpenAttendanceForm}
          students={students}
        />
      ) : (
        <ClassList classes={classes} handleClaseClick={handleClassSelected} />
      )}
    </>
  );
};

export default ListAttendancePage;
