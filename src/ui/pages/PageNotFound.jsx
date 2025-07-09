import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-300 mb-6">Page Not Found</p>

        <Link to="/" className="text-blue-500 hover:underline">
          Regresar al Inicio
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
