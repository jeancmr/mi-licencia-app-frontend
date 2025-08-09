const Main = ({ children }) => {
  return (
    <div
      className="max-w-7xl mx-auto py-8"
      style={{ minHeight: 'calc(100vh - 4rem - 2.5rem)' }} // 4rem = navbar height, 3rem = footer height
    >
      <div className="bg-zinc-800 rounded-md flex flex-col px-4 py-6">{children}</div>
    </div>
  );
};
export default Main;
