// import React, { useContext } from "react";
// import { ExpenseContext } from "../../context/ExpenseContext";

// const ExpenseHistory = () => {
//   const { expenses } = useContext(ExpenseContext);

//   return (
//     <div className="bg-white p-6 rounded shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Expense History</h1>
//       <table className="min-w-full border border-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border-b">Date</th>
//             <th className="p-2 border-b">Description</th>
//             <th className="p-2 border-b">Amount ($)</th>
//             <th className="p-2 border-b">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map((exp) => (
//             <tr key={exp.id} className="text-gray-700 hover:bg-gray-50">
//               <td className="p-2 border-b">{exp.date}</td>
//               <td className="p-2 border-b">{exp.title}</td>
//               <td className="p-2 border-b">{exp.amount}</td>
//               <td
//                 className={`p-2 border-b font-semibold ${
//                   exp.status === "Approved"
//                     ? "text-green-600"
//                     : exp.status === "Pending"
//                     ? "text-yellow-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {exp.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExpenseHistory;






import React, { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";

const ExpenseHistory = () => {
  const { expenses } = useContext(ExpenseContext);

  return (
    <div className=" min-h-screen p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Expense History
          </h1>
          <p className="text-gray-600">Track and manage all your expenses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-800">{expenses.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">Total Amount</p>
            <p className="text-2xl font-bold text-gray-800">
              ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm">Approved</p>
            <p className="text-2xl font-bold text-gray-800">
              {expenses.filter(exp => exp.status === "Approved").length}
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {expenses.map((exp, index) => (
                  <tr
                    key={exp.id}
                    className="transition-all duration-200 hover:bg-indigo-50 hover:shadow-md"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{exp.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-800">{exp.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-lg font-bold text-gray-800">
                        ${exp.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                          exp.status === "Approved"
                            ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                            : exp.status === "Pending"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"
                            : "bg-gradient-to-r from-red-400 to-red-500 text-white"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No expenses found</p>
                        <p className="text-gray-400 text-sm mt-1">Start adding your expenses to see them here</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHistory;