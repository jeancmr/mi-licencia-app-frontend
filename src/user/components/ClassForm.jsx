import { useEffect, useState } from 'react';
import { getUsersByRol } from '../api/getUsersByRol';

const ClassForm = ({ selectedClass, onRemoveClass }) => {
  const [dateInput, setDateInput] = useState(selectedClass.originalDate);
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const gettingProfessors = async () => {
      try {
        const data = await getUsersByRol('professors');
        setProfessors(data);
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    gettingProfessors();
  }, []);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDateInput(newDate);
  };

  return (
    <form className="space-y-4">
      <header className="flex items-center justify-between mb-4">
        <h4 className="text-3xl font-bold">{selectedClass.materia.nombre}</h4>
        <span
          onClick={() => onRemoveClass(selectedClass.id)}
          className="text-red-500 font-bold cursor-pointer"
        >
          &#10005;
        </span>
      </header>
      <label htmlFor="classDate">Fecha</label>
      <br />
      <input id="classDate" type="date" value={dateInput} onChange={handleDateChange} />

      <select
        name="selectProfessor"
        id="selectProfessor"
        className="w-md bg-gray-600 text-white"
        value={selectedClass.profesorId}
      >
        {professors?.map((professor) => (
          <option key={professor.id} value={professor.id} className="text-white">
            {professor.nombre}
          </option>
        ))}
      </select>
    </form>
  );
};
export default ClassForm;
