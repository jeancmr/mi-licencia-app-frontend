import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { AlertMessage, AuthErrorMessage, InputForm } from '../components/';
import { useAlert, useAuth } from '../hooks/';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, errors: registerErrors } = useAuth();
  const { alert, onAlert } = useAlert();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signUp(data);
    onAlert(res);
  });

  return (
    <AuthLayout title={'Registrarse'}>
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
          type="text"
          placeholder="Nombre"
          register={register}
          name="nombre"
          required={true}
          error={errors.nombre}
        />
        <InputForm
          type="text"
          placeholder="Identificación"
          register={register}
          minLength={{
            value: 5,
            message: 'La identificación debe tener al menos 5 caracteres',
          }}
          name="identificacion"
          required={true}
          error={errors.identificacion}
        />
        <InputForm
          type="password"
          placeholder="Contraseña"
          register={register}
          name="contrasena"
          required={true}
          minLength={{
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres',
          }}
          error={errors.contrasena}
        />

        {alert.message && <AlertMessage message={alert.message} />}

        <AuthErrorMessage authError={registerErrors} />

        <button className="bg-indigo-500 px-4 py-1 rounded-sm mt-4 cursor-pointer">
          Registrar usuario
        </button>
      </form>

      <p>
        ¿Ya tienes una cuenta?
        <Link to="/login" className="text-blue-500 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
