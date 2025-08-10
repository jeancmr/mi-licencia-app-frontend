import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useClasses } from '../../../hooks';
import { BackButton, ClassList } from '../../../components';
import AttendanceForm from '../components/AttendanceForm';

const ListAttendancePage = () => {
  const { user } = useAuth();

  const { classes, isLoading } = useClasses('professor', user.id, true);
  const [classSelected, setClassSelected] = useState(null);
  const [openAttendanceForm, setOpenAttendanceForm] = useState(false);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

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
        <div>
          <BackButton onGoBack={() => navigate(-1)} className="mb-5" />

          <ClassList classes={classes} handleClaseClick={handleClassSelected} />
        </div>
      )}
    </>
  );
};

export default ListAttendancePage;
