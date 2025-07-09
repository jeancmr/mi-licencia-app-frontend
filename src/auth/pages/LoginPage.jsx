import { useForm } from 'react-hook-form';
import InputForm from '../../components/shared/InputForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, errors: loginErrors } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    signIn(data);
  });

  return (
    <div className="flex justify-center items-center h-screen from-blue-500 to-purple-500">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Inicio de sesión</h1>
        <form onSubmit={onSubmit}>
          <InputForm
            type="email"
            placeholder="Correo"
            register={register}
            name="correo"
            required={true}
            error={errors.correo}
          />
          <InputForm
            type="password"
            placeholder="Contraseña"
            register={register}
            name="contrasena"
            required={true}
            error={errors.contrasena}
          />
          {loginErrors?.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <button className="bg-indigo-500 px-4 py-1 rounded-sm mt-4 cursor-pointer">
            Iniciar sesión
          </button>
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
export default LoginPage;
