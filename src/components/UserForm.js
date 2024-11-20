import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ onAdd, editingUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (editingUser) {
      setUser({
        name: editingUser.name,
        email: editingUser.email,
        department: editingUser.company.name,
      });
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      // Edit user
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
          ...user,
          id: editingUser.id,
        });
        onAdd(response.data); // This will update the user list
      } catch (error) {
        alert('Error editing user');
      }
    } else {
      // Add user
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
        onAdd(response.data);
      } catch (error) {
        alert('Error adding user');
      }
    }
    setUser({ name: "", email: "", department: "" }); // Clear form
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <label>Department:</label>
      <input
        type="text"
        value={user.department}
        onChange={(e) => setUser({ ...user, department: e.target.value })}
        required
      />
      <button type="submit">{editingUser ? "Save" : "Add User"}</button>
    </form>
  );
};

export default UserForm;
