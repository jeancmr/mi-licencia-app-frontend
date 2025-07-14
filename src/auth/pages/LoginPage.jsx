import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/';
import { AuthLayout } from '../layout/AuthLayout';
import { AuthErrorMessage } from '../components/';
import InputForm from '../../components/shared/InputForm';

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
    <AuthLayout title="Iniciar Sesión">
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

        <AuthErrorMessage authError={loginErrors} />

        <button className="bg-indigo-500 px-4 py-1 rounded-sm mt-4 cursor-pointer">
          Iniciar sesión
        </button>
      </form>

      <p>
        ¿No tienes cuenta?
        <Link to="/register" className="text-blue-500 hover:underline">
          Regístrate
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
