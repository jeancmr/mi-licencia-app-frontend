const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-indigo-500 rounded-md cursor-pointer px-3 py-2 font-semibold hover:bg-indigo-600 transition-colorsd md:text-lg md:px-6 md:py-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
