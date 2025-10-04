import React, { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const PendingApprovalsPage = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Office supplies for Q1 project",
      amount: 89.99,
      currency: "USD",
      category: "Office Supplies",
      employeeName: "Jane Worker",
      date: "Jan 13, 2024",
      status: "Pending",
      description: "Office supplies for Q1 project",
    },
    {
      id: 2,
      title: "Client dinner meeting",
      amount: 350.00,
      currency: "USD",
      category: "Meals",
      employeeName: "John Smith",
      date: "Jan 15, 2024",
      status: "Pending",
      description: "Dinner with potential client to discuss Q1 partnership",
    },
    {
      id: 3,
      title: "Flight tickets to NYC conference",
      amount: 1250.00,
      currency: "USD",
      category: "Travel",
      employeeName: "Sarah Johnson",
      date: "Jan 14, 2024",
      status: "Pending",
      description: "Round trip tickets for Tech Summit 2024",
    },
    {
      id: 4,
      title: "Software subscription renewal",
      amount: 500.00,
      currency: "USD",
      category: "Software",
      employeeName: "Emily Brown",
      date: "Jan 12, 2024",
      status: "Pending",
      description: "Annual Figma team subscription",
    },
  ]);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleApprove = (expenseId) => {
    setExpenses(expenses.map(exp => 
      exp.id === expenseId ? { ...exp, status: "Approved" } : exp
    ));
  };

  const handleReject = (expenseId) => {
    setExpenses(expenses.map(exp => 
      exp.id === expenseId ? { ...exp, status: "Rejected" } : exp
    ));
  };

  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
    setShowDetailModal(true);
  };

  const pendingExpenses = expenses.filter(exp => exp.status === "Pending");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-600 mt-2">Expenses waiting for your approval</p>
        </div>

        <div className="space-y-4">
          {pendingExpenses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">No pending approvals</p>
            </div>
          ) : (
            pendingExpenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {expense.title}
                        </h3>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                          {expense.status}
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        $ {expense.currency} {expense.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div>
                      <span className="text-gray-600 font-medium">Category:</span>{" "}
                      <span className="text-gray-900">{expense.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Employee:</span>{" "}
                      <span className="text-gray-900">{expense.employeeName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-medium">Date:</span>{" "}
                      <span className="text-gray-900">{expense.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(expense)}
                      className="p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleApprove(expense.id)}
                      className="p-3 bg-green-500 text-white hover:bg-green-600 rounded-lg transition"
                      title="Approve"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(expense.id)}
                      className="p-3 bg-red-500 text-white hover:bg-red-600 rounded-lg transition"
                      title="Reject"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-gray-600">
                  {expense.description}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showDetailModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Expense Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="text-lg font-semibold text-gray-900">{selectedExpense.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-lg font-semibold text-gray-900">
                    $ {selectedExpense.currency} {selectedExpense.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedExpense.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Employee</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedExpense.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedExpense.date}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-900">{selectedExpense.description}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    handleApprove(selectedExpense.id);
                    setShowDetailModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedExpense.id);
                    setShowDetailModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovalsPage;