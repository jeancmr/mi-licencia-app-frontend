import { useState } from 'react';
import { useClasses } from '../../hooks/useClasses';
import { useAuth } from '../../../context/AuthContext';
import AttendanceForm from './AttendanceForm';
import ListClasses from '../../components/ListClasses';

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
        <ListClasses classes={classes} handleClaseClick={handleClassSelected} />
      )}
    </>
  );
};

export default ListAttendancePage;
