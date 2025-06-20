import { Link } from 'react-router-dom';

const UserOptions = ({ options }) => {
  return (
    <ul className="list-disc list-inside flex gap-4 mt-2.5">
      {options.map((option) => (
        <Link to={`/${option.name}`} className="text-blue-500 hover:underline" key={option.id}>
          {option.description}
        </Link>
      ))}
    </ul>
  );
};
export default UserOptions;
