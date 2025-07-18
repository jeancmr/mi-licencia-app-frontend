import { BackButton, Button } from '../../components';
import { useUserForm } from '../hooks';

const UserForm = ({ selectedUser, onDeSelectUser, onUpdateUser }) => {
  const { formData, handleChange, onSubmit } = useUserForm(selectedUser, onUpdateUser);

  const submit = async (e) => {
    await onSubmit(e);
    onDeSelectUser();
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <BackButton onGoBack={() => onDeSelectUser()} />

      <header className="flex items-center justify-between mb-4">
        <h4 className="text-3xl font-bold">{selectedUser.nombre}</h4>
      </header>

      <div className="grid grid-cols-3 mb-3 mx-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="classDate">Nombre</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="aula">Correo</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="aula">Identificación</label>
          <input
            className="bg-gray-700 px-3 py-1 rounded-md"
            id="identificacion"
            name="identificacion"
            type="text"
            value={formData.identificacion}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="aula">Rol</label>
          <select
            name="rol"
            id="rol"
            className="bg-gray-700 px-3 py-1 rounded-md"
            onChange={handleChange}
            value={formData.rol}
          >
            <option value="admin">Administrador</option>
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
          </select>
        </div>
      </div>

      <Button className="mt-2 mx-2">Guardar</Button>
    </form>
  );
};
export default UserForm;
