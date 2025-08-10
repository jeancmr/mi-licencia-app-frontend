import { useClassForm } from '../hooks';
import { BackButton, Button } from './';

const ClassForm = ({ selectedClass, onRemoveClass, onGoBack, onRefreshClasses }) => {
  const { formData, handleChange, signatureName, professors, asignatures, onSubmit } = useClassForm(
    selectedClass,
    onRefreshClasses
  );

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <BackButton onGoBack={() => onGoBack()} />

      <header className="flex items-center justify-between mb-4">
        <h4 className="text-2xl md:text-3xl font-bold">{signatureName}</h4>

        {selectedClass?.id && (
          <button
            onClick={() => onRemoveClass(selectedClass?.id)}
            className="bg-red-500 px-4 py-2 cursor-pointer rounded-md"
          >
            Eliminar
          </button>
        )}
      </header>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-3 mx-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="classDate">Fecha de la clase</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="fecha"
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="profesorId">Profesor</label>
          <select
            name="profesorId"
            id="profesorId"
            className="bg-gray-700 px-3 py-1 rounded-md"
            onChange={handleChange}
            value={formData.profesorId}
          >
            {professors?.map((professor) => (
              <option key={professor.id} value={professor.id} className="text-white">
                {professor.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="aula">Aula</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="aula"
            name="aula"
            type="text"
            value={formData.aula}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="horaInicio">Hora de inicio</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="horaInicio"
            name="horaInicio"
            type="time"
            value={formData.horaInicio}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="horaFin">Hora fin</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="horaFin"
            name="horaFin"
            type="time"
            value={formData.horaFin}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cuposMaximos">Cupo máximo</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="cuposMaximos"
            name="cuposMaximos"
            type="number"
            value={formData.cuposMaximos}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="materiaId">Asignatura</label>
          <select
            name="materiaId"
            id="materiaId"
            className="bg-gray-700 px-3 py-1 rounded-md"
            onChange={handleChange}
            value={formData.materiaId}
          >
            {asignatures?.map((asignature) => (
              <option key={asignature.id} value={asignature.id} className="text-white">
                {asignature.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button className="mt-2 mx-2">Guardar</Button>
    </form>
  );
};
export default ClassForm;
