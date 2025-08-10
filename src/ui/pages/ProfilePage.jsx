import { useAuth } from '../../auth/hooks/useAuth';
import { Button } from '../../components';
import { useUserForm } from '../../user/admin/hooks';

const ProfilePage = () => {
  const { user } = useAuth();
  const { formData, handleChange, onSubmit } = useUserForm(user);

  const submit = async (event) => {
    await onSubmit(event);
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Perfil</h1>
      <form className="mt-4 text-white" onSubmit={submit}>
        <div className="grid grid-cols-4 mb-3 mx-2 gap-3">
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
        </div>
        <Button className="mt-2 mx-2">Guardar</Button>
      </form>
    </section>
  );
};
export default ProfilePage;
