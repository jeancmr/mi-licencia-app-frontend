import { useForm } from 'react-hook-form';
import InputForm from '../../components/shared/InputForm';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, errors: registerErrors } = useAuth();
  const [alert, setAlert] = useState({
    message: '',
    color: '',
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await signUp(data);
    setAlert({
      message: res ? 'Usuario registrado correctamente' : 'Error al registrar el usuario:',
      color: res ? 'green' : 'red',
    });
  });

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert({
          message: '',
          color: '',
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Registro</h1>
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

          {alert.message && <p className={`text-${alert.color}-500`}>{alert.message}</p>}

          {registerErrors?.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <button className="bg-indigo-500 px-4 py-1 rounded-sm mt-4 cursor-pointer">
            Registrar usuario
          </button>
        </form>
        <p className="">
          ¿Ya tienes una cuenta?
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
