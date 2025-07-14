export const AuthErrorMessage = ({ authError }) => {
  return (
    <>
      {authError?.map((error, index) => (
        <p key={index} className="text-red-500">
          {error}
        </p>
      ))}
    </>
  );
};
