const Main = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-8">
      <div className="bg-zinc-800 w-full max-w-4xl p-10 rounded-md max-h-[90vh] flex flex-col">
        {children}
      </div>
    </div>
  );
};
export default Main;
