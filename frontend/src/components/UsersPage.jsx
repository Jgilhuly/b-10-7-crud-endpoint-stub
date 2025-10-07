import { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

function UsersPage() {
  const [userToEdit, setUserToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (user) => {
    setUserToEdit(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setUserToEdit(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setUserToEdit(null);
  };

  return (
    <div>
      <UserForm 
        userToEdit={userToEdit}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <UserList 
        key={refreshKey}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default UsersPage;
