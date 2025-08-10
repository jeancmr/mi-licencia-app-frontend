import { Link } from 'react-router-dom';

const UserOptions = ({ options }) => {
  return (
    <ul className="list-disc list-inside flex flex-col gap-3 mt-4 md:flex-row">
      {options.map((option) => (
        <Link to={`/${option.name}`} className="text-gray-400 hover:underline" key={option.id}>
          {option.description}
        </Link>
      ))}
    </ul>
  );
};
export default UserOptions;
