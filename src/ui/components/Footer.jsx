const Footer = () => {
  return (
    <div className="bg-zinc-800 text-white h-10 flex items-center justify-center">
      <div className="max-w-7xl mx-auto text-center">
        &copy; {new Date().getFullYear()} jeancmr. Todos los derechos reservados.
      </div>
    </div>
  );
};
export default Footer;
