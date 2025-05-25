import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ListEnrollment from './ListEnrollment';
import Loading from '../../components/shared/Loading';
import ListClasses from './ListClasses';
import Button from '../../components/shared/Button';
import { postData, getEnrollments } from '../../api/enrollment';
import { getClasses } from '../../api/classes';
const API_URL = import.meta.env.VITE_API_URL;

const EnrollmentPage = () => {
  const { user } = useAuth();
  const [showClasses, setShowClasses] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    color: '',
  });
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
      const data = await postData(`${API_URL}/inscripciones`, enrollmentData);
      setAlertMessage({
        message: 'Inscripción exitosa',
        color: 'green',
      });
      setSelectedClase(null);
      fetchEnrollments();
    } catch (error) {
      console.error('Error al inscribir:', error);
      setAlertMessage({
        message: error.message,
        color: 'red',
      });
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
      const dataFormatted = response.map((clase) => ({
        ...clase,
        fecha: new Date(clase.fecha).toLocaleDateString(),
      }));
      setClases(dataFormatted);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setAlertMessage({
        message: error.message,
        color: 'red',
      });
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
      setAlertMessage({
        message: error.message,
        color: 'red',
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {showClasses ? 'Clases Inscritas' : 'Registrar clase'}
      </h1>

      {showClasses ? (
        <>
          <ListEnrollment enrollments={enrollments} />
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

            {errors.claseId && (
              <p className="text-red-500 text-sm mb-2">{errors.claseId.message}</p>
            )}
            {alertMessage.message && (
              <p className={`text-${alertMessage.color}-500 text-sm mb-2`}>
                {alertMessage.message}
              </p>
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
