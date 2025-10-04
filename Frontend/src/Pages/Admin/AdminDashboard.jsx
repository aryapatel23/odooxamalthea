import React from "react";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Expenses", value: 5, color: "from-blue-500 to-blue-600", icon: <FileText className="w-7 h-7" />, bgColor: "bg-blue-500" },
    { label: "Pending", value: 0, color: "from-amber-500 to-amber-600", icon: <Clock className="w-7 h-7" />, bgColor: "bg-amber-500" },
    { label: "Approved", value: 4, color: "from-green-500 to-green-600", icon: <CheckCircle className="w-7 h-7" />, bgColor: "bg-green-500" },
    { label: "Rejected", value: 1, color: "from-red-500 to-red-600", icon: <XCircle className="w-7 h-7" />, bgColor: "bg-red-500" },
  ];

  return (
    <div className="p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your expense management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-xl border-l-4 hover:shadow-2xl transition-shadow" style={{ borderLeftColor: stat.bgColor.replace('bg-', '') }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl shadow-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">New expense submitted</p>
                <p className="font-semibold text-gray-800">Hotel booking - $450.00</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Expense approved</p>
                <p className="font-semibold text-gray-800">Team lunch - $120.00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
                Review Pending Approvals
              </button>
              <button className="w-full px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;