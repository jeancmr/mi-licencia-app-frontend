import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ListEnrollment from './ListEnrollment';
import Loading from '../../components/shared/Loading';
import ListClasses from './ListClasses';
import Button from '../../components/shared/Button';
const API_URL = import.meta.env.VITE_API_URL;

const EnrollmentPage = () => {
  const [clases, setClases] = useState([]);
  const { user } = useAuth();
  const [showClasses, setShowClasses] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    color: '',
  });
  const [selectedClase, setSelectedClase] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch(`${API_URL}/inscripciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(enrollmentData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error([data.message || 'Error al inscribir']);
      }
      setAlertMessage({
        message: 'Inscripción exitosa',
        color: 'green',
      });
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
      const response = await fetch(`${API_URL}/clases`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      const dataFormatted = data.map((clase) => ({
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
      const reponse = await fetch(`${API_URL}/inscripciones/estudiante/${user.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await reponse.json();

      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setAlertMessage({
        message: error.message,
        color: 'red',
      });
    }

    useEffect(() => {}, [selectedClase]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-8">
      <div className="bg-zinc-800 w-full max-w-4xl p-10 rounded-md max-h-[90vh] flex flex-col">
        <h1 className="text-3xl font-bold mb-6">
          {showClasses ? 'Clases Inscritas' : 'Registrar clase'}
        </h1>

        {showClasses ? (
          <>
            <ListEnrollment enrollments={enrollments} />
          </>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 overflow-y-auto pr-2 flex-1">
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
              <p className={`text-${alertMessage.color}-500 mb-2`}>{alertMessage.message}</p>
            )}

            <Button type="submit" className={'w-full'}>
              Registrar
            </Button>
          </form>
        )}

        <Button className="mt-6" onClick={() => setShowClasses(!showClasses)}>
          {showClasses ? 'Ocultar clases' : 'Ver clases registradas'}
        </Button>
      </div>
    </div>
  );
};
export default EnrollmentPage;
