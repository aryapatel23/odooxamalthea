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
  Users,
  DollarSign,
  AlertTriangle,
  Check,
  X,
  ArrowUpCircle,
  Filter,
  Calendar,
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

const ManagerExpenseDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [employeeFilter, setEmployeeFilter] = useState("All Employees");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [comments, setComments] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // State for team expenses - now managed with state instead of const
  const [teamExpenses, setTeamExpenses] = useState([
    {
      id: 1,
      employeeName: "John Smith",
      employeeId: "EMP001",
      title: "Client dinner meeting",
      amount: 350.00,
      currency: "USD",
      category: "Meals",
      date: "Jan 15, 2024",
      submittedDate: "Jan 16, 2024",
      status: "Pending",
      priority: "Normal",
      description: "Dinner with potential client to discuss Q1 partnership",
      receipts: 1,
    },
    {
      id: 2,
      employeeName: "Sarah Johnson",
      employeeId: "EMP002",
      title: "Flight tickets to NYC conference",
      amount: 1250.00,
      currency: "USD",
      category: "Travel",
      date: "Jan 14, 2024",
      submittedDate: "Jan 14, 2024",
      status: "Pending",
      priority: "High",
      description: "Round trip tickets for Tech Summit 2024",
      receipts: 2,
    },
    {
      id: 3,
      employeeName: "Mike Davis",
      employeeId: "EMP003",
      title: "Office supplies for team",
      amount: 85.50,
      currency: "USD",
      category: "Office Supplies",
      date: "Jan 13, 2024",
      submittedDate: "Jan 13, 2024",
      status: "Approved",
      priority: "Normal",
      description: "Notebooks, pens, and stationery for new team members",
      receipts: 1,
      approvedBy: "You",
      approvedDate: "Jan 14, 2024",
    },
    {
      id: 4,
      employeeName: "Emily Brown",
      employeeId: "EMP004",
      title: "Software subscription renewal",
      amount: 500.00,
      currency: "USD",
      category: "Software",
      date: "Jan 12, 2024",
      submittedDate: "Jan 12, 2024",
      status: "Pending",
      priority: "High",
      description: "Annual Figma team subscription",
      receipts: 1,
      requiresEscalation: true,
      escalationReason: "Amount exceeds manager approval limit ($400)",
    },
    {
      id: 5,
      employeeName: "John Smith",
      employeeId: "EMP001",
      title: "Taxi fare to airport",
      amount: 45.00,
      currency: "USD",
      category: "Travel",
      date: "Jan 11, 2024",
      submittedDate: "Jan 11, 2024",
      status: "Rejected",
      priority: "Normal",
      description: "Taxi to airport for NYC trip",
      receipts: 1,
      rejectedBy: "You",
      rejectedDate: "Jan 12, 2024",
      rejectionReason: "No pre-approval for taxi. Please use company shuttle.",
    },
  ]);

  // Monthly team expense data
  const monthlyTeamData = [
    { month: "Jul", amount: 5400 },
    { month: "Aug", amount: 4800 },
    { month: "Sep", amount: 6200 },
    { month: "Oct", amount: 5800 },
    { month: "Nov", amount: 7100 },
    { month: "Dec", amount: 6500 },
  ];

  // Category breakdown
  const categoryData = [
    { name: "Travel", value: 8500, color: "#6366f1" },
    { name: "Meals", value: 4200, color: "#8b5cf6" },
    { name: "Office Supplies", value: 2100, color: "#ec4899" },
    { name: "Software", value: 3800, color: "#f59e0b" },
  ];

  // Employee expense data
  const employeeExpenseData = [
    { name: "John Smith", total: 1200 },
    { name: "Sarah Johnson", total: 2800 },
    { name: "Mike Davis", total: 950 },
    { name: "Emily Brown", total: 1650 },
    { name: "Alex Wilson", total: 890 },
  ];

  // Calculate stats dynamically from teamExpenses state
  const totalExpenses = teamExpenses.length;
  const pendingExpenses = teamExpenses.filter(e => e.status === "Pending").length;
  const approvedExpenses = teamExpenses.filter(e => e.status === "Approved").length;
  const rejectedExpenses = teamExpenses.filter(e => e.status === "Rejected").length;
  const escalationRequired = teamExpenses.filter(e => e.requiresEscalation && e.status === "Pending").length;
  const totalAmount = teamExpenses
    .filter(e => e.status !== "Rejected")
    .reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = teamExpenses.filter(expense => {
    const matchesSearch = 
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || expense.status === statusFilter;
    const matchesCategory = categoryFilter === "All Categories" || expense.category === categoryFilter;
    const matchesEmployee = employeeFilter === "All Employees" || expense.employeeName === employeeFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesEmployee;
  });

  const handleAction = (expense, action) => {
    setSelectedExpense(expense);
    setActionType(action);
    setShowApprovalModal(true);
  };

  const confirmAction = async () => {
    if (!selectedExpense) return;

    // Update the expense in the state
    setTeamExpenses(prevExpenses => 
      prevExpenses.map(expense => {
        if (expense.id === selectedExpense.id) {
          const currentDate = new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });

          if (actionType === 'approve') {
            return {
              ...expense,
              status: "Approved",
              approvedBy: user?.username || "You",
              approvedDate: currentDate,
              approvalComments: comments || "Approved without comments"
            };
          } else if (actionType === 'reject') {
            return {
              ...expense,
              status: "Rejected",
              rejectedBy: user?.username || "You",
              rejectedDate: currentDate,
              rejectionReason: comments || "Rejected without specific reason"
            };
          } else if (actionType === 'escalate') {
            return {
              ...expense,
              status: "Escalated",
              escalatedBy: user?.username || "You",
              escalatedDate: currentDate,
              escalationComments: comments || "Escalated to higher management"
            };
          }
        }
        return expense;
      })
    );

    // Show success message (you can add a toast notification here)
    console.log(`${actionType} expense:`, selectedExpense.id, "Comments:", comments);
    
    // Close modal and reset
    setShowApprovalModal(false);
    setComments("");
    setSelectedExpense(null);
    setActionType(null);

    // You can also make an API call here if needed
    // try {
    //   await axios.post(`/api/expenses/${selectedExpense.id}/${actionType}`, { comments });
    // } catch (error) {
    //   console.error('Error updating expense:', error);
    // }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-100 text-amber-700",
      Approved: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
      Escalated: "bg-purple-100 text-purple-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      High: "bg-red-100 text-red-700",
      Normal: "bg-blue-100 text-blue-700",
      Low: "bg-gray-100 text-gray-700",
    };
    return styles[priority] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Expense Management</h1>
            <p className="text-sm text-gray-600 mt-1">Review and manage your team's expenses</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Manager</p>
            <p className="font-semibold text-gray-900">{user?.username || "Manager Name"}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                <p className="text-sm text-gray-600 mb-1">Pending Review</p>
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

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-indigo-600">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Alert for Escalation Required */}
        {escalationRequired > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">
                {escalationRequired} expense{escalationRequired > 1 ? 's' : ''} require{escalationRequired === 1 ? 's' : ''} escalation
              </p>
              <p className="text-sm text-amber-700 mt-1">
                These expenses exceed your approval limit and need higher management review
              </p>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Team Expense Trend */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Expense Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTeamData}>
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

          {/* Expense by Employee */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense by Employee</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={employeeExpenseData}>
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                  formatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Management Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Team Expense Requests</h2>
              <p className="text-sm text-gray-600">Review, approve, or reject expense submissions</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by employee or expense title..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Escalated</option>
                </select>
                
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Travel</option>
                  <option>Meals</option>
                  <option>Office Supplies</option>
                  <option>Software</option>
                </select>
                
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                >
                  <option>All Employees</option>
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                  <option>Mike Davis</option>
                  <option>Emily Brown</option>
                </select>
              </div>
            </div>

            {/* Expense Items */}
            <div className="space-y-4">
              {filteredExpenses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No expenses found matching your filters</p>
                </div>
              ) : (
                filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 text-lg">{expense.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(expense.status)}`}>
                            {expense.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(expense.priority)}`}>
                            {expense.priority}
                          </span>
                          {expense.requiresEscalation && expense.status === "Pending" && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 flex items-center gap-1">
                              <ArrowUpCircle className="w-3 h-3" />
                              Escalation Required
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{expense.employeeName}</span>
                          <span className="text-gray-400">•</span>
                          <span>{expense.employeeId}</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Amount:</span>
                            <p className="font-semibold text-gray-900">{expense.currency} {expense.amount.toFixed(2)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Category:</span>
                            <p className="font-medium text-gray-900">{expense.category}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Expense Date:</span>
                            <p className="font-medium text-gray-900">{expense.date}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Submitted:</span>
                            <p className="font-medium text-gray-900">{expense.submittedDate}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{expense.description}</p>

                        {expense.requiresEscalation && expense.status === "Pending" && (
                          <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-3">
                            <p className="text-sm text-orange-800 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="font-medium">Escalation Reason:</span> {expense.escalationReason}
                            </p>
                          </div>
                        )}

                        {expense.status === "Approved" && expense.approvedBy && (
                          <div className="text-sm text-green-700 bg-green-50 rounded p-2">
                            <p><span className="font-medium">Approved by:</span> {expense.approvedBy} on {expense.approvedDate}</p>
                            {expense.approvalComments && (
                              <p className="mt-1"><span className="font-medium">Comments:</span> {expense.approvalComments}</p>
                            )}
                          </div>
                        )}

                        {expense.status === "Rejected" && expense.rejectionReason && (
                          <div className="text-sm text-red-700 bg-red-50 rounded p-2">
                            <p><span className="font-medium">Rejected by:</span> {expense.rejectedBy} on {expense.rejectedDate}</p>
                            <p className="mt-1"><span className="font-medium">Reason:</span> {expense.rejectionReason}</p>
                          </div>
                        )}

                        {expense.status === "Escalated" && (
                          <div className="text-sm text-purple-700 bg-purple-50 rounded p-2">
                            <p><span className="font-medium">Escalated by:</span> {expense.escalatedBy} on {expense.escalatedDate}</p>
                            {expense.escalationComments && (
                              <p className="mt-1"><span className="font-medium">Comments:</span> {expense.escalationComments}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {expense.status === "Pending" && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => handleAction(expense, 'approve')}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(expense, 'reject')}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                        {expense.requiresEscalation && (
                          <button
                            onClick={() => handleAction(expense, 'escalate')}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-medium"
                          >
                            <ArrowUpCircle className="w-4 h-4" />
                            Escalate
                          </button>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {actionType === 'approve' ? 'Approve Expense' : 
               actionType === 'reject' ? 'Reject Expense' : 
               'Escalate Expense'}
            </h3>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{selectedExpense?.title}</p>
              <p className="text-lg font-bold text-gray-900">
                {selectedExpense?.currency} {selectedExpense?.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mt-1">by {selectedExpense?.employeeName}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments {actionType === 'reject' ? '(Required)' : '(Optional)'}
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                placeholder={`Add your ${actionType} comments...`}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmAction}
                disabled={actionType === 'reject' && !comments.trim()}
                className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition ${
                  actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                  actionType === 'reject' ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed' :
                  'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                Confirm {actionType === 'approve' ? 'Approval' : 
                         actionType === 'reject' ? 'Rejection' : 
                         'Escalation'}
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setComments("");
                  setSelectedExpense(null);
                  setActionType(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerExpenseDashboard;