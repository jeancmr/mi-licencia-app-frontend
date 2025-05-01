import { useState } from 'react';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error');
      }
      console.log('Login successful:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="bg-indigo-950 p-6 rounded shadow-md w-80">
        <div className="mb-4 text-white">
          <label className="block text-amber-50 text-sm font-bold mb-2" htmlFor="email">
            Correo
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-50 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-amber-50 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-50 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
        >
          Iniciar sesión
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        ¿No tienes una cuenta?{' '}
        <a href="/register" className="text-blue-500">
          Regístrate
        </a>
      </p>
      <p className="mt-4 text-gray-600">
        Recuperar contraseña?{' '}
        <a href="/forgot-password" className="text-blue-500">
          Click aquí
        </a>
      </p>
    </div>
  );
};
export default Loginpage;
