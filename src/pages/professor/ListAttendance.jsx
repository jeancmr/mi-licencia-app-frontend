import { useEffect, useState } from 'react';
import { getClasses } from '../../api/classes';
import { useAuth } from '../../context/AuthContext';
import ModalAsistencia from './ModalAsistencia';
import { showAlert } from '../../utils/alertMessage';
const API_URL = import.meta.env.VITE_API_URL;

const ListAttendance = () => {
  const { user } = useAuth();
  const [clases, setClases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [classSelected, setClassSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await getClasses(`${API_URL}/clases/professor/${user.user.id}`);

      const hoy = new Date();
      const dia = hoy.getDate();
      const mes = hoy.getMonth() + 1;
      const anio = hoy.getFullYear();

      const todayDate = `${dia}/${mes}/${anio}`;

      const todayClasses = response.filter((clase) => clase.fecha === todayDate);

      setClases(todayClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
      showAlert('Error', 'Error al obtener las clases', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassSelected = (clase) => {
    console.log('Clase seleccionada:', clase);
    setClassSelected(clase);
    setStudents(clase.estudiantes);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <>
      {openModal && classSelected ? (
        <ModalAsistencia classId={classSelected} setOpenModal={setOpenModal} students={students} />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {clases.length === 0 && <p>No hay clases programadas para hoy.</p>}

          {clases.map((clase) => (
            <div
              key={clase.id}
              className={`block bg-zinc-700 rounded-lg p-6 cursor-pointer hover:bg-zinc-600 transition-colors`}
              onClick={() => handleClassSelected(clase)}
            >
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-semibold text-indigo-400">{clase?.materia?.nombre}</h3>
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
                    <span className="text-gray-400">Cupos disponibles:</span>
                    <span className="ml-2">{clase.cuposDisponibles}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default ListAttendance;
