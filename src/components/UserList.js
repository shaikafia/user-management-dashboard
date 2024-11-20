import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={editUser}
              onDelete={deleteUser}
            />
          ))}
        </div>
      )}
      <UserForm onAdd={addUser} editingUser={editingUser} />
    </div>
  );
};

export default UserList;
