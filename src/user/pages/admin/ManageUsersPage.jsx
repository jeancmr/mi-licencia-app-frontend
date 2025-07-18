import { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';
import TableUsers from '../../components/TableUsers';
import { Loading } from '../../components/';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = (user) => {
    console.log('Selected user:', user);
    setSelectedUser(user);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Administrar usuarios</h1>

      {isLoading ? <Loading /> : <TableUsers data={users} onSelectUser={handleSelectUser} />}
    </div>
  );
};
export default ManageUsersPage;
