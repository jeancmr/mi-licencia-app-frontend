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
  const [selectedClase, setSelectedClase] = useState(null);
  

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
      const dataFormatted = data.map(clase => ({
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
      console.log('data: ', data)
      
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setAlertMessage({
        message: error.message,
        color: 'red',
      });
    }

    useEffect(() => {
      console.log('selectedClase: ', selectedClase);
    }, [selectedClase]);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-8">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md max-h-[80vh] flex flex-col">
        <h1 className="text-2xl font-bold mb-4">{showClasses ? 'Clases Inscritas' : 'Registrar clase'}</h1>

        {showClasses ? (
          <>
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
              {enrollments.map((enrollment) => (
                <div 
                  key={enrollment.id} 
                  className="bg-zinc-700 p-4 rounded-lg shadow-md hover:bg-zinc-600 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                    {enrollment.clase.materia.nombre}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Fecha:</span>
                      <span className="ml-2">{new Date(enrollment.clase.fecha).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Aula:</span>
                      <span className="ml-2">{enrollment.clase.aula}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Hora inicio:</span>
                      <span className="ml-2">{enrollment.clase.horaInicio}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Hora fin:</span>
                      <span className="ml-2">{enrollment.clase.horaFin}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400">Profesor:</span>
                      <span className="ml-2">{enrollment.clase.profesor.nombre}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={onSubmit} className='space-y-3 overflow-y-auto pr-2 flex-1'>
            <label className="block text-gray-300 mb-2">Seleccione una clase</label>

              {clases.map((clase) => (
                <div
                  key={clase.id}
                  className={`block bg-zinc-700 rounded-lg p-4 cursor-pointer hover:bg-zinc-600 transition-colors ${selectedClase === clase.id ? 'border-2 border-indigo-500 bg-zinc-600' : ''}`}
                  onClick={() => handleClaseClick(clase)}
                >
                  <input
                    type="radio"
                    {...register('claseId', {
                      valueAsNumber: true,
                      required: "Debe seleccionar una clase"
                    })}
                    value={clase.id}
                    checked={selectedClase === clase.id}
                    onChange={() => handleClaseClick(clase)}
                    className="hidden"
                  />
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold text-indigo-400">
                      {clase.materia.nombre}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Fecha:</span>
                        <span className="ml-2">{clase.fecha}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Aula:</span>
                        <span className="ml-2">{clase.aula}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Hora inicio:</span>
                        <span className="ml-2">{clase.horaInicio}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Hora fin:</span>
                        <span className="ml-2">{clase.horaFin}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400">Profesor:</span>
                        <span className="ml-2">{clase.profesor.nombre}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400">Cupos disponibles:</span>
                        <span className="ml-2">{clase.cuposMaximos}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            
            {errors.claseId && (
              <p className="text-red-500 text-sm mb-2">{errors.claseId.message}</p>
            )}
            
            {alertMessage.message && (
              <p className={`text-${alertMessage.color}-500 mb-2`}>
                {alertMessage.message}
              </p>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors cursor-pointer"
            >
              Registrar
            </button>
          </form>
        )}
        <button
          className="bg-indigo-500 px-4 py-2 rounded-sm mt-4 cursor-pointer"
          onClick={() => setShowClasses(!showClasses)}
        >
          {showClasses ? 'Ocultar clases' : 'Ver clases registradas'}
        </button>
      </div>
    </div>
  );
};
export default Enrollment;
