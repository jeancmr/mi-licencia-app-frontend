import { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';
import TableUsers from '../../components/TableUsers';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Administrar usuarios</h1>

      <TableUsers data={users} />
    </div>
  );
};
export default ManageUsersPage;
