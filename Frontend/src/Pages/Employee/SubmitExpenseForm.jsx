import React, { useState, useContext } from "react";
import { Camera, Upload } from "lucide-react";
import { ExpenseContext } from "../../context/ExpenseContext"; // ✅ Import context

const SubmitExpenseForm = ({ setActiveTab }) => {
  const { expenses, setExpenses } = useContext(ExpenseContext); // ✅ Use context
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    currency: "USD",
    category: "",
    date: "",
    comments: "",
    receipt: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewExpense((prev) => ({ ...prev, receipt: e.target.files[0] }));
  };

  const handleSubmitExpense = (e) => {
    e.preventDefault();
    const id = expenses.length + 1;
    const expense = {
      id,
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      currency: newExpense.currency,
      category: newExpense.category,
      date: newExpense.date,
      status: "Pending",
      comments: newExpense.comments,
      receipt: newExpense.receipt,
    };

    setExpenses([expense, ...expenses]); // ✅ Push to context
    if (setActiveTab) setActiveTab("expenses");

    // Reset form
    setNewExpense({
      title: "",
      amount: "",
      currency: "USD",
      category: "",
      date: "",
      comments: "",
      receipt: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit New Expense</h1>
          <p className="text-gray-600">Upload receipts and submit expense claims</p>
        </div>

        {/* Receipt Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Receipt Upload & OCR</h2>
          </div>

          <label className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Upload Receipt</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf"
            />
          </label>

          {newExpense.receipt && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: {newExpense.receipt.name}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                step="0.01"
                value={newExpense.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Currency</label>
              <select
                name="currency"
                value={newExpense.currency}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer transition-all"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={newExpense.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer transition-all"
                required
              >
                <option value="">Select category</option>
                <option value="Travel">Travel</option>
                <option value="Meals">Meals</option>
                <option value="Supplies">Supplies</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={newExpense.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="comments"
              placeholder="Enter expense description..."
              value={newExpense.comments}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitExpense}
            className="w-full mt-8 bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-lg"
          >
            Submit Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitExpenseForm;