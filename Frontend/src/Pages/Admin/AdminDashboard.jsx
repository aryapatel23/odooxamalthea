// src/pages/admin/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-700 mb-2">
        Overview of the company’s expenses and workflow.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-100 p-4 rounded shadow">Total Users: 50</div>
        <div className="bg-green-100 p-4 rounded shadow">Pending Approvals: 12</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Total Expenses: $15,000</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
