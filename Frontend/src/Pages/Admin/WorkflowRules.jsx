// src/pages/admin/WorkflowRules.jsx
import React from "react";

const WorkflowRules = () => {
  const rules = [
    { id: 1, type: "Expense Limit", value: "$500", approver: "Manager" },
    { id: 2, type: "Travel Approval", value: "All trips", approver: "Admin" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Workflow Rules</h1>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Rule Type</th>
            <th className="p-2 border-b">Value</th>
            <th className="p-2 border-b">Approver</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id} className="text-gray-700 hover:bg-gray-50">
              <td className="p-2 border-b">{rule.type}</td>
              <td className="p-2 border-b">{rule.value}</td>
              <td className="p-2 border-b font-semibold">{rule.approver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowRules;
