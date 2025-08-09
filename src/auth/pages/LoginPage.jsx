import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/';
import { AuthLayout } from '../layout/AuthLayout';
import { AuthErrorMessage, InputForm } from '../components/';

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
      <form onSubmit={onSubmit} className="flex flex-col">
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

        <button className="bg-indigo-500 px-4 py-2 rounded-sm mt-3 cursor-pointer mb-2 hover:bg-indigo-600 transition-colors">
          Iniciar sesión
        </button>
      </form>

      <p>
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Regístrate
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
