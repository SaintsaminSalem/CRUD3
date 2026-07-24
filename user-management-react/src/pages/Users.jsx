import { useState } from "react";
import useUsers from "../hooks/useUsers";
import Loader from "../components/Loader";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

export default function Users() {
  const {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (formData) => {
    if (selectedUser) {
      await editUser(selectedUser._id, formData);
      setSelectedUser(null);
    } else {
      await addUser(formData);
    }
  };

  return (
    <div className="user-container">
      <h1>User Management System</h1>

      {error && <p className="error">{error}</p>}

      <UserForm
        key={selectedUser?._id || "new"}
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
      />

      <UserTable
        users={users}
        onDelete={removeUser}
        onEdit={(user) => setSelectedUser(user)}
      />
    </div>
  );
}