import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton, Button, Loading } from '../../../components';
import { UserForm, UserTable } from '../components';
import { useUser } from '../hooks';

const ManageUsersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
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
      <BackButton onGoBack={() => navigate(-1)} className={showForm ? 'hidden' : ''} />

      <header className={`${showForm ? 'hidden' : ''} flex justify-between items-center mb-6`}>
        <h1 className="text-2xl md:text-3xl font-bold">Administrar usuarios</h1>
        <Button onClick={() => setShowForm(true)}>Agregar</Button>
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
