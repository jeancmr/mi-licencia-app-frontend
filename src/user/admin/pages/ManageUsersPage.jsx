import { Loading } from '../../components';
import { UserForm, UserTable } from '../components';
import { useUser } from '../hooks';

const ManageUsersPage = () => {
  const { users, isLoading, selectedUser, onSelectUser, onDeSelectUser, onUpdateUser } = useUser();

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Administrar usuarios</h1>

      {selectedUser?.id && (
        <UserForm
          selectedUser={selectedUser}
          onDeSelectUser={onDeSelectUser}
          onUpdateUser={onUpdateUser}
        />
      )}

      {isLoading && !selectedUser?.id && <Loading />}

      {!isLoading && !selectedUser?.id && (
        <UserTable data={users} onSelectUser={onSelectUser} onDeSelectUser={onDeSelectUser} />
      )}
    </div>
  );
};
export default ManageUsersPage;
