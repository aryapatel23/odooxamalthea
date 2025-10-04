import React, { useState } from "react";
import { FileText, Search, Eye } from "lucide-react";

const ExpenseReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const expenses = [
    { id: 1, title: "Taxi fare to client meeting", amount: 150.00, category: "Travel", date: "Jan 15, 2024", status: "Approved", employee: "John Employee" },
    { id: 2, title: "Business lunch with client", amount: 45.50, category: "Meals", date: "Jan 14, 2024", status: "Approved", employee: "John Employee" },
    { id: 3, title: "Office supplies purchase", amount: 230.00, category: "Supplies", date: "Jan 12, 2024", status: "Pending", employee: "Sarah Manager" },
    { id: 4, title: "Software subscription", amount: 99.00, category: "Software", date: "Jan 10, 2024", status: "Rejected", employee: "Mike Developer" },
    { id: 5, title: "Client dinner meeting", amount: 180.00, category: "Meals", date: "Jan 08, 2024", status: "Approved", employee: "Lisa Sales" },
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Expense Reports</h1>
          <p className="text-gray-600">View and manage all company expenses</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer font-semibold"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-indigo-200 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{expense.title}</h3>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                      expense.status === "Pending" ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white" :
                      expense.status === "Approved" ? "bg-gradient-to-r from-green-400 to-green-500 text-white" :
                      "bg-gradient-to-r from-red-400 to-red-500 text-white"
                    }`}>
                      {expense.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block">Amount</span>
                      <span className="text-lg font-bold text-indigo-600">USD {expense.amount.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Category</span>
                      <span className="font-semibold text-gray-800">{expense.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Date</span>
                      <span className="font-semibold text-gray-800">{expense.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Employee</span>
                      <span className="font-semibold text-gray-800">{expense.employee}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg">
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseReports;