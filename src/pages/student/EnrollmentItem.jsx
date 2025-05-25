const EnrollmentItem = ({ enrollment, onDeleteEnrollment }) => {
  return (
    <div
      key={enrollment.id}
      className="bg-zinc-700 p-6 rounded-lg shadow-md hover:bg-zinc-600 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-indigo-400 mb-2">
          {enrollment.clase.materia.nombre}
        </h3>
        <span
          className="text-red-500 font-bold cursor-pointer"
          onClick={() => onDeleteEnrollment(enrollment.id)}
        >
          &#10005;
        </span>
      </div>
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
  );
};

export default EnrollmentItem;
