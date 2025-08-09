const Main = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-700 to-gray-500 py-8">
      <div className="bg-zinc-800 w-full max-w-4xl px-10 py-12 rounded-md max-h-[80vh] flex flex-col">
        {children}
      </div>
    </div>
  );
};
export default Main;
