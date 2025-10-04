import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  ChevronDown,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ExpenseDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Sample expense data
  const expenses = [
    {
      id: 1,
      title: "Taxi fare to client meeting",
      amount: "USD 150.00",
      category: "Travel",
      date: "Jan 15, 2024",
      status: "Pending",
    },
    {
      id: 2,
      title: "Business lunch with client",
      amount: "USD 45.50",
      category: "Meals",
      date: "Jan 14, 2024",
      status: "Approved",
      comments: "Approved - valid business meal",
    },
  ];

  // Monthly expense data for line chart
  const monthlyData = [
    { month: "Jan", amount: 2400 },
    { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 3200 },
    { month: "Apr", amount: 2800 },
    { month: "May", amount: 3500 },
    { month: "Jun", amount: 2900 },
  ];

  // Category breakdown for pie chart
  const categoryData = [
    { name: "Travel", value: 5200, color: "#6366f1" },
    { name: "Meals", value: 3400, color: "#8b5cf6" },
    { name: "Office Supplies", value: 2100, color: "#ec4899" },
    { name: "Software", value: 1800, color: "#f59e0b" },
  ];

  // Status breakdown for bar chart
  const statusData = [
    { status: "Approved", count: 15, color: "#10b981" },
    { status: "Pending", count: 8, color: "#f59e0b" },
    { status: "Rejected", count: 3, color: "#ef4444" },
  ];

  const totalExpenses = expenses.length + 0; // 2
  const pendingExpenses = expenses.filter(e => e.status === "Pending").length; // 1
  const approvedExpenses = expenses.filter(e => e.status === "Approved").length; // 1
  const rejectedExpenses = 0;

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || expense.status === statusFilter;
    const matchesCategory = categoryFilter === "All Categories" || expense.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-900">{totalExpenses}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-amber-600">{pendingExpenses}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedExpenses}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{rejectedExpenses}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Expense Trend */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expense Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                  formatter={(value) => `$${value}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button className="px-6 py-3 text-sm font-medium text-gray-900 border-b-2 border-indigo-600">
                My Expenses
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">My Expenses</h2>
              <p className="text-sm text-gray-600">Your submitted expenses</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white pr-8"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white pr-8"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Travel</option>
                  <option>Meals</option>
                  <option>Office Supplies</option>
                  <option>Software</option>
                </select>
              </div>
            </div>

            {/* Expense Items */}
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{expense.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            expense.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : expense.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {expense.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Amount:</span> {expense.amount}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {expense.category}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {expense.date}
                        </div>
                      </div>
                      {expense.comments && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Comments:</span> {expense.comments}
                        </div>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors ml-4">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;