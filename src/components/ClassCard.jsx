const ClassCard = ({ 
  clase, 
  onClick, 
  isSelected = false, 
  showRadio = false, 
  register = null,
  showProfessor = false 
}) => {
  return (
    <div
      className={`block bg-zinc-700 rounded-lg p-6 cursor-pointer hover:bg-zinc-600 transition-colors ${
        isSelected ? 'border-2 border-indigo-500 bg-zinc-600' : ''
      }`}
      onClick={() => onClick && onClick(clase)}
    >
      {showRadio && register && (
        <input
          type="radio"
          {...register('claseId', {
            valueAsNumber: true,
            required: 'Debe seleccionar una clase',
          })}
          value={clase.id}
          checked={isSelected}
          onChange={() => onClick && onClick(clase)}
          className="hidden"
        />
      )}
      
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-semibold text-indigo-400">
          {clase?.materia?.nombre}
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
          
          {showProfessor && clase.profesor && (
            <div className="col-span-2">
              <span className="text-gray-400">Profesor:</span>
              <span className="ml-2">{clase.profesor.nombre}</span>
            </div>
          )}
          
          <div className="col-span-2">
            <span className="text-gray-400">Cupos disponibles:</span>
            <span className="ml-2">{clase.cuposDisponibles}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard; 