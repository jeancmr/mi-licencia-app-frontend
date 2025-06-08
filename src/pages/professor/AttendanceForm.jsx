import { useForm } from 'react-hook-form';
const API_URL = import.meta.env.VITE_API_URL;

const AttendanceForm = ({ classId, onOpenAttendanceForm, students }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const claseName = classId?.materia?.nombre || 'Clase';

  const onSubmit = async (data) => {
    const asistencias = Object.entries(data.asistencia).map(([key, asistio]) => ({
      estudianteId: Number(key.replace('id_', '')),
      asistio: !!asistio,
    }));

    await fetch(`${API_URL}/asistencias/registro-multiple`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        claseId: classId.id,
        asistencias,
      }),
    });

    onOpenAttendanceForm(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1 className="text-2xl font-bold mb-4">{`Registrar Asistencia - ${claseName}`}</h1>

      <table className="min-w-full border border-gray-300 mb-4">
        <thead>
          <tr className="">
            <th className="border px-4 py-2 text-left">¿Asistió?</th>
            <th className="border px-4 py-2 text-left">Estudiante</th>
          </tr>
        </thead>
        <tbody>
          {students.map((estudiante) => (
            <tr key={estudiante.id}>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  {...register(`asistencia.id_${estudiante.id}`)}
                  className="w-5 h-5"
                />
              </td>
              <td className="border px-4 py-2">{estudiante.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="submit"
        className="bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600"
      >
        Registrar Asistencia
      </button>
    </form>
  );
};

export default AttendanceForm;
