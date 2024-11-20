import React from "react";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <p>ID: {user.id}</p>
      <p>First Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Department: {user.company.name}</p>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

export default UserCard;
