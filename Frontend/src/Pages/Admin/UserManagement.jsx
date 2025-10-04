import React from "react";
import { Users } from "lucide-react";

const UserManagement = () => {
  const users = [
    { id: 1, name: "John Employee", email: "john@company.com", role: "Employee", department: "Sales", status: "Active", expenses: 12 },
    { id: 2, name: "Sarah Manager", email: "sarah@company.com", role: "Manager", department: "Operations", status: "Active", expenses: 8 },
    { id: 3, name: "Mike Developer", email: "mike@company.com", role: "Employee", department: "IT", status: "Active", expenses: 15 },
    { id: 4, name: "Lisa Sales", email: "lisa@company.com", role: "Employee", department: "Sales", status: "Active", expenses: 20 },
  ];

  return (
    <div className="p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
            <p className="text-gray-600">Manage employees and their permissions</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
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
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 font-semibold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;