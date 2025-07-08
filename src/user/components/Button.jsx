const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-indigo-500 px-6 py-3 rounded-md  cursor-pointer text-lg font-semibold hover:bg-indigo-600 transition-colorsd ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
