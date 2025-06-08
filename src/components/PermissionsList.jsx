import { Link } from 'react-router-dom';

const PermissionsList = ({ permissions }) => {
  return (
    <ul className="list-disc list-inside flex gap-4 mt-2.5">
      {permissions.map((item) => (
        <Link to={`/${item.name}`} className="text-blue-500 hover:underline" key={item.id}>
          {item.description}
        </Link>
      ))}
    </ul>
  );
};
export default PermissionsList;
