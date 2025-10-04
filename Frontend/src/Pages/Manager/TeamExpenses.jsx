import React, { useState } from 'react';
import { DollarSign, Calendar, User, Filter, Download, Search, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const TeamExpenses = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Sample expense data
  const [expenses] = useState([
    { id: 1, employee: 'John Smith', category: 'Travel', amount: 1250.00, date: '2025-10-01', status: 'approved', description: 'Client meeting - NYC', receipt: true, notes: 'Flight and accommodation for 2-day client presentation', department: 'Sales' },
    { id: 2, employee: 'Sarah Johnson', category: 'Software', amount: 299.00, date: '2025-10-02', status: 'pending', description: 'Adobe Creative Suite', receipt: true, notes: 'Annual subscription renewal for design team', department: 'Marketing' },
    { id: 3, employee: 'Mike Davis', category: 'Meals', amount: 85.50, date: '2025-10-02', status: 'approved', description: 'Team lunch', receipt: true, notes: 'Quarterly team building lunch', department: 'Engineering' },
    { id: 4, employee: 'Emily Brown', category: 'Office Supplies', amount: 156.75, date: '2025-10-03', status: 'pending', description: 'Printer paper & toner', receipt: true, notes: 'Office supplies restocking', department: 'Operations' },
    { id: 5, employee: 'John Smith', category: 'Travel', amount: 450.00, date: '2025-10-03', status: 'rejected', description: 'Hotel accommodation', receipt: false, notes: 'Missing receipt - cannot process', department: 'Sales' },
    { id: 6, employee: 'Lisa Anderson', category: 'Training', amount: 899.00, date: '2025-10-04', status: 'approved', description: 'Project Management Course', receipt: true, notes: 'PMP certification training course', department: 'Operations' },
    { id: 7, employee: 'Tom Wilson', category: 'Travel', amount: 320.00, date: '2025-10-04', status: 'pending', description: 'Uber rides - conference', receipt: true, notes: 'Transportation during Tech Summit 2025', department: 'Engineering' },
    { id: 8, employee: 'Sarah Johnson', category: 'Equipment', amount: 1499.00, date: '2025-10-04', status: 'approved', description: 'Laptop accessories', receipt: true, notes: 'External monitor and docking station', department: 'Marketing' },
  ]);

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenses.filter(exp => exp.status === 'pending');
  const approvedExpenses = expenses.filter(exp => exp.status === 'approved');
  const rejectedExpenses = expenses.filter(exp => exp.status === 'rejected');

  // Filter expenses
  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || exp.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Team Expenses</h1>
          <p className="text-gray-600">Monitor and manage your team's expense reports</p>
        </div>

        {/* Expense Detail Modal */}
        {selectedExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Expense Details</h2>
                  <button
                    onClick={() => setSelectedExpense(null)}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Employee Info */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedExpense.employee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedExpense.employee}</h3>
                    <p className="text-gray-600">{selectedExpense.department} Department</p>
                  </div>
                </div>

                {/* Expense Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="font-semibold text-gray-900">{selectedExpense.category}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="font-bold text-2xl text-gray-900">${selectedExpense.amount.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="font-semibold text-gray-900">{selectedExpense.date}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(selectedExpense.status)}`}>
                      {getStatusIcon(selectedExpense.status)}
                      {selectedExpense.status.charAt(0).toUpperCase() + selectedExpense.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Description</p>
                  <p className="text-gray-900">{selectedExpense.description}</p>
                </div>

                {/* Notes */}
                <div className="bg-amber-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Additional Notes</p>
                  <p className="text-gray-900">{selectedExpense.notes}</p>
                </div>

                {/* Receipt Status */}
                <div className={`p-4 rounded-xl ${selectedExpense.receipt ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center gap-2">
                    {selectedExpense.receipt ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="font-semibold text-green-700">Receipt Attached</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="font-semibold text-red-700">No Receipt Attached</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setSelectedExpense(null)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-gray-900">{pendingExpenses.length}</p>
            <p className="text-sm text-gray-500 mt-1">${pendingExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Approved</p>
            <p className="text-3xl font-bold text-gray-900">{approvedExpenses.length}</p>
            <p className="text-sm text-gray-500 mt-1">${approvedExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Rejected</p>
            <p className="text-3xl font-bold text-gray-900">{rejectedExpenses.length}</p>
            <p className="text-sm text-gray-500 mt-1">${rejectedExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by employee, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({expenses.length})
              </button>
              <button
                onClick={() => setSelectedFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === 'pending'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending ({pendingExpenses.length})
              </button>
              <button
                onClick={() => setSelectedFilter('approved')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === 'approved'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approved ({approvedExpenses.length})
              </button>
              <button
                onClick={() => setSelectedFilter('rejected')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === 'rejected'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rejected ({rejectedExpenses.length})
              </button>
            </div>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg font-medium">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                          {expense.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-900">{expense.employee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{expense.description}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {expense.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900 text-lg">
                        ${expense.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(expense.status)}`}>
                        {getStatusIcon(expense.status)}
                        {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => setSelectedExpense(expense)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">No expenses found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamExpenses;