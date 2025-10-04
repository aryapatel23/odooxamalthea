import React, { useState } from "react";
import { Users, X } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Employee", email: "john@company.com", role: "Employee", department: "Sales", status: "Active", expenses: 12 },
    { id: 2, name: "Sarah Manager", email: "sarah@company.com", role: "Manager", department: "Operations", status: "Active", expenses: 8 },
    { id: 3, name: "Mike Developer", email: "mike@company.com", role: "Employee", department: "IT", status: "Active", expenses: 15 },
    { id: 4, name: "Lisa Sales", email: "lisa@company.com", role: "Employee", department: "Sales", status: "Active", expenses: 20 },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Employee",
    department: "",
    status: "Active",
    expenses: 0
  });

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
    setShowModal(true);
  };

  const handleStatusChange = (newStatus) => {
    setEditingUser({ ...editingUser, status: newStatus });
  };

  const handleSave = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    setShowModal(false);
    setEditingUser(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleNewUserChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
  };

  const handleSaveNewUser = () => {
    if (!newUser.name || !newUser.email || !newUser.department) {
      alert("Please fill in all required fields");
      return;
    }

    const newUserId = Math.max(...users.map(u => u.id)) + 1;
    const userToAdd = {
      ...newUser,
      id: newUserId,
      expenses: 0
    };

    setUsers([...users, userToAdd]);
    setShowAddModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "Employee",
      department: "",
      status: "Active",
      expenses: 0
    });
  };

  const handleCancelAddUser = () => {
    setShowAddModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "Employee",
      department: "",
      status: "Active",
      expenses: 0
    });
  };

  return (
    <div className="p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
            <p className="text-gray-600">Manage employees and their permissions</p>
          </div>
          <button 
            onClick={handleAddUser}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            + Add User
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Department</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Expenses</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-indigo-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{user.department}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-full font-bold text-sm">
                      {user.expenses}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === "Active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleEditClick(user)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {showModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit User Status</h2>
                <button 
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {editingUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{editingUser.name}</p>
                    <p className="text-sm text-gray-500">{editingUser.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      User Status
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleStatusChange("Active")}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                          editingUser.status === "Active"
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => handleStatusChange("Inactive")}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                          editingUser.status === "Inactive"
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Role:</span> {editingUser.role}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Department:</span> {editingUser.department}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
                <button 
                  onClick={handleCancelAddUser}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => handleNewUserChange("name", e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => handleNewUserChange("email", e.target.value)}
                    placeholder="user@company.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => handleNewUserChange("role", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white cursor-pointer transition-all"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUser.department}
                    onChange={(e) => handleNewUserChange("department", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white cursor-pointer transition-all"
                  >
                    <option value="">Select department</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleNewUserChange("status", "Active")}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                        newUser.status === "Active"
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleNewUserChange("status", "Inactive")}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                        newUser.status === "Inactive"
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveNewUser}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Add User
                </button>
                <button
                  onClick={handleCancelAddUser}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;