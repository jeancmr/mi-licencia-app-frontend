import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ListEnrollment from './ListEnrollment';
import Loading from '../../components/shared/Loading';
import ListClasses from './ListClasses';
import Button from '../../components/shared/Button';
import { postData, getEnrollments, deleteEnrollment } from '../../api/enrollment';
import { getClasses } from '../../api/classes';
import { showAlert, showConfirmation } from '../../utils/alertMessage';
const API_URL = import.meta.env.VITE_API_URL;

const EnrollmentPage = () => {
  const { user } = useAuth();
  const [showClasses, setShowClasses] = useState(false);
  const [selectedClase, setSelectedClase] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clases, setClases] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClaseClick = (clase) => {
    setSelectedClase(clase.id);
    setValue('claseId', clase.id);
  };

  const onSubmit = handleSubmit(async (data) => {
    const enrollmentData = {
      estudianteId: user.user.id,
      claseId: data.claseId,
    };

    try {
      await postData(`${API_URL}/inscripciones`, enrollmentData);
      showAlert('Inscripción exitosa', 'Has sido inscrito/a en la clase correctamente', 'success');
      setSelectedClase(null);
      fetchEnrollments();
    } catch (error) {
      console.error('Error al inscribir la clase:', error);
      showAlert('Error', error.message, 'error');
    }
  });

  useEffect(() => {
    fetchClasses();
    fetchEnrollments();
  }, []);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await getClasses(`${API_URL}/clases`);
      setClases(response);
    } catch (error) {
      console.error('Error fetching classes:', error);
      showAlert('Error', 'Error al obtener las clases', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const data = await getEnrollments(`${API_URL}/inscripciones/estudiante/${user.user.id}`);
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      showAlert('Error', 'Error al obtener las inscripciones', 'error');
    }
  };

  const handleDeleteEnrollment = async (enrollmentId) => {
    try {
      showConfirmation(
        '¿Seguro que deseas eliminar la inscripción?',
        'Esta acción no se puede deshacer',
        'warning'
      ).then(async (result) => {
        if (result.isConfirmed) {
          await deleteEnrollment(`${API_URL}/inscripciones/${enrollmentId}`);
          showAlert(
            'Inscripción eliminada',
            'La inscripción ha sido eliminada correctamente',
            'success'
          );
          fetchEnrollments();
        }
      });
    } catch (error) {
      console.error('Error al eliminar la inscripción:', error);
      showAlert('Error', error.message, 'error');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {showClasses ? 'Clases Inscritas' : 'Registrar clase'}
      </h1>

      {showClasses ? (
        <>
          <ListEnrollment enrollments={enrollments} onDeleteEnrollment={handleDeleteEnrollment} />
        </>
      ) : (
        <>
          <form onSubmit={onSubmit} className="space-y-4 pr-2 flex-1 overflow-y-auto relative">
            <label className="block text-gray-300 text-lg mb-4">Seleccione una clase</label>
            {isLoading ? (
              <Loading />
            ) : (
              <ListClasses
                clases={clases}
                selectedClase={selectedClase}
                handleClaseClick={handleClaseClick}
                register={register}
              />
            )}

            <div className="sticky bottom-0 ">
              <Button type="submit" className="w-full mt-0">
                Registrar
              </Button>
            </div>
          </form>
        </>
      )}

      <Button className="mt-6" onClick={() => setShowClasses(!showClasses)}>
        {showClasses ? 'Ocultar clases' : 'Ver clases registradas'}
      </Button>
    </>
  );
};
export default EnrollmentPage;
