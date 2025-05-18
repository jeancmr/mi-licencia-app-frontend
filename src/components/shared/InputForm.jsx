const InputForm = ({ type, placeholder, register, name, required = false, error, minLength }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, 
          
          { required: `El campo ${placeholder} es requerido`,
          minLength
        }
        )}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      />
      {error && <span className="text-red-500 block">{error.message}</span>}
    </>
  );
};
export default InputForm;
