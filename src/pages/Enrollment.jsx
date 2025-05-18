import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

const Enrollment = () => {
  const [clases, setClases] = useState([]);
  const { user } = useAuth();
  const [showClasses, setShowClasses] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    color: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      if(!response.ok){
        throw new Error([data.message || 'Error al inscribir']);
      }
      console.log('Inscripción exitosa:', data);
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
      const response = await fetch(`${API_URL}/clases`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setClases(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setAlertMessage({
        message: error.message,
        color: 'red',
      });
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
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">{showClasses ? 'Clases' : 'Registrar clase'}</h1>

        {showClasses ? (
          <>
            <div>
              {enrollments.map((enrollment) => (
                <div key={enrollment.id}>{enrollment.clase.materia.nombre}</div>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <label>Seleccione una clase</label>
            <select
              {...register('claseId', {
                valueAsNumber: true,
              })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            >
              {clases.map((clase) => (
                <option key={clase.id} value={clase.id}>
                  {`${clase.materia.nombre} - ${clase.fecha} - ${clase.horaInicio} - ${clase.horaFin}`}
                </option>
              ))}
            </select>
            
        {
          alertMessage.message && (
            <p className={`text-${alertMessage.color}-500`}>
                        {alertMessage.message}
              </p>
          )}
            <button className="bg-indigo-500 px-4 py-1 rounded-sm mt-4 cursor-pointer">
              Registrar
            </button>
          </form>
        )}
        <button
          className="bg-indigo-500 px-4 py-1 rounded-sm mt-4 cursor-pointer"
          onClick={() => setShowClasses(!showClasses)}
        >
          {showClasses ? 'Ocultar clases' : 'Ver clases registradas'}
        </button>
      </div>
    </div>
  );
};
export default Enrollment;
