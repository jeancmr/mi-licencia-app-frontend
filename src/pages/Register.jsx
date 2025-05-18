import { useForm } from 'react-hook-form';
import InputForm from '../components/shared/InputForm';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, errors: registerErrors } = useAuth();
  const [alert, setAlert] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    signUp(data);
    setAlert('Usuario registrado correctamente');
  });

  useEffect(()=>{
    if(alert){
        const timer = setTimeout(()=>{
            setAlert('');
        }, 5000);
        return ()=> clearTimeout(timer);
    }
   },[alert])

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
          type='text'
          placeholder='Nombre'
          register={register}
          name='nombre'
          required={true}
          error={errors.nombre}
          />
          <InputForm 
          type='text'
          placeholder='Identificación'
          register={register}
          name='identificacion'
          required={true}
          error={errors.identificacion}
          />
          <InputForm
            type="password"
            placeholder="Contraseña"
            register={register}
            name="contrasena"
            required={true}
            minLength={
                {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres'
                }
            }
            error={errors.contrasena}
          />
            {registerErrors?.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}
        {alert && <p className="text-green-500">{alert}</p>}
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
export default Register;
