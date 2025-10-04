import React, { useState } from 'react';
import { LayoutDashboard, Users, FileCheck, FileText, LogOut, Search, Clock, CheckCircle, XCircle, TrendingUp, FileEdit, BarChart3, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'workflow', label: 'Workflow Rules', icon: FileCheck },
    { id: 'expenses', label: 'Expense Overview', icon: FileText },
  ];

  const recentActivities = [
    { id: 1, type: 'submitted', description: 'New expense submitted', title: 'Hotel booking', amount: 450.00, time: '5 mins ago' },
    { id: 2, type: 'approved', description: 'Expense approved', title: 'Team lunch', amount: 120.00, time: '1 hour ago' },
    { id: 3, type: 'rejected', description: 'Expense rejected', title: 'Office supplies', amount: 85.00, time: '2 hours ago' },
    { id: 4, type: 'submitted', description: 'New expense submitted', title: 'Software license', amount: 299.00, time: '3 hours ago' },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'submitted': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <FileEdit className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex">
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Overview of your expense management system</p>
            </div>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-12 pr-6 py-3 w-96 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Expenses */}
          <button
            onClick={() => setActiveMenu('expenses')}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Total Expenses</p>
                <p className="text-5xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </button>

          {/* Pending */}
          <button
            onClick={() => setActiveMenu('expenses')}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Pending</p>
                <p className="text-5xl font-bold text-orange-500">1</p>
              </div>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </button>

          {/* Approved */}
          <button
            onClick={() => setActiveMenu('expenses')}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Approved</p>
                <p className="text-5xl font-bold text-green-500">1</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </button>

          {/* Rejected */}
          <button
            onClick={() => setActiveMenu('expenses')}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Rejected</p>
                <p className="text-5xl font-bold text-red-500">0</p>
              </div>
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                    <p className="font-semibold text-gray-900 mb-1">{activity.title} - ${activity.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-semibold text-left flex items-center gap-3"
              >
                <Clock className="w-5 h-5" />
                Review Pending Approvals
              </button>
              <button 
                onClick={() => navigate('/expense-overview')}
                className="w-full py-4 px-6 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-left flex items-center gap-3"
              >
                <BarChart3 className="w-5 h-5" />
                Generate Report
              </button>
              <button 
                onClick={() => navigate('/user-management')}
                className="w-full py-4 px-6 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-left flex items-center gap-3"
              >
                <Users className="w-5 h-5" />
                Manage Users
              </button>
              <button 
                onClick={() => navigate('/workflow-rules')}
                className="w-full py-4 px-6 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-left flex items-center gap-3"
              >
                <FileCheck className="w-5 h-5" />
                Set Workflow Rules
              </button>
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-600 mb-2">System Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold text-gray-900">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;