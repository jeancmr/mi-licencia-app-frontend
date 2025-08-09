import { useState } from 'react';
import { Button, Loading } from '../../../components';
import { UserForm, UserTable } from '../components';
import { useUser } from '../hooks';

const ManageUsersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    users,
    isLoading,
    selectedUser,
    onSelectUser,
    onDeSelectUser,
    onUpdateUser,
    onDeleteUser,
    onCreateUser,
  } = useUser();

  const handleSelectUser = (user) => {
    onSelectUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    onDeSelectUser();
    setShowForm(false);
  };

  return (
    <div className="">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Administrar usuarios</h1>
        <Button className={selectedUser ? 'hidden' : ''} onClick={() => setShowForm(true)}>
          Agregar usuario
        </Button>
      </header>

      {(selectedUser?.id || showForm) && (
        <UserForm
          selectedUser={selectedUser}
          onCancelForm={handleCancelForm}
          onUpdateUser={onUpdateUser}
          onCreateUser={onCreateUser}
        />
      )}

      {isLoading && !selectedUser?.id && <Loading />}

      {!isLoading && !selectedUser?.id && !showForm && (
        <UserTable data={users} onSelectUser={handleSelectUser} onDeleteUser={onDeleteUser} />
      )}
    </div>
  );
};
export default ManageUsersPage;
