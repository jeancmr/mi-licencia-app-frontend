import { useForm } from 'react-hook-form';
import InputForm from '../components/shared/InputForm';
import { Link } from 'react-router-dom';

const Loginpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Inicio de sesión</h1>
        <form onSubmit={onSubmit}>
          <InputForm
            type="email"
            placeholder="Correo"
            register={register}
            name="email"
            required={true}
            error={errors.email}
          />
          <InputForm
            type="password"
            placeholder="Contraseña"
            register={register}
            name="password"
            required={true}
            error={errors.password}
          />
          <button className="bg-indigo-500 px-4 py-1 rounded-sm mt-4">Iniciar sesión</button>
        </form>
        <p className="">
          ¿No tienes cuenta?
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Loginpage;
