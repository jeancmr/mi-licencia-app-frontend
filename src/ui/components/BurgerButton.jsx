const BurgerButton = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex flex-col justify-center items-center w-8 h-8 md:hidden transition-all duration-300 ease-in-out"
      aria-label="Menu"
      aria-expanded={isOpen}
    >
      <span
        className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform ${
          isOpen ? 'rotate-45 translate-y-1.5' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform ${
          isOpen ? '-rotate-45 -translate-y-1.5' : ''
        }`}
      />
    </button>
  );
};

export default BurgerButton;
