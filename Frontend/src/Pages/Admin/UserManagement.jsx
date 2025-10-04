// src/pages/admin/UserManagement.jsx
import React from "react";

const UserManagement = () => {
  const users = [
    { id: 1, name: "Prem Kambaliya", email: "prem@example.com", role: "employee" },
    { id: 2, name: "Krisha Ahir", email: "krisha@example.com", role: "manager" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">User Management</h1>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-gray-700 hover:bg-gray-50">
              <td className="p-2 border-b">{user.name}</td>
              <td className="p-2 border-b">{user.email}</td>
              <td className="p-2 border-b font-semibold">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
