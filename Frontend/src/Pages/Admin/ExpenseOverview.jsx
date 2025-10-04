// src/pages/admin/ExpenseOverview.jsx
import React from "react";

const ExpenseOverview = () => {
  const expenses = [
    { id: 1, employee: "Prem Kambaliya", amount: 300, status: "Approved" },
    { id: 2, employee: "Krisha Ahir", amount: 200, status: "Pending" },
    { id: 3, employee: "John Doe", amount: 450, status: "Rejected" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Expense Overview</h1>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Employee</th>
            <th className="p-2 border-b">Amount ($)</th>
            <th className="p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} className="text-gray-700 hover:bg-gray-50">
              <td className="p-2 border-b">{exp.employee}</td>
              <td className="p-2 border-b">{exp.amount}</td>
              <td className={`p-2 border-b font-semibold ${
                exp.status === "Approved"
                  ? "text-green-600"
                  : exp.status === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>
                {exp.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseOverview;
