import { useState } from 'react';
import { useClasses } from '../../hooks/useClasses';
import { useAuth } from '../../context/AuthContext';
import AttendanceForm from './AttendanceForm';
import ClassCard from '../../components/ClassCard';

const ListAttendance = () => {
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
        <div className="grid grid-cols-2 gap-4">
          {classes.length === 0 && (
            <p className="col-span-2 text-center text-gray-400">
              No hay clases programadas para hoy.
            </p>
          )}

          {classes.map((clase) => (
            <ClassCard key={clase.id} clase={clase} onClick={handleClassSelected} />
          ))}
        </div>
      )}
    </>
  );
};

export default ListAttendance;
