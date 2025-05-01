const InputForm = ({ type, placeholder, register, name, required = false, error }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      />
      {error && <span className="text-red-500 block">{placeholder} es requerido</span>}
    </>
  );
};
export default InputForm;
