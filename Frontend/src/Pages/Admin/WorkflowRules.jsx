import React from "react";
import { GitBranch } from "lucide-react";

const WorkflowRules = () => {
  const workflowRules = [
    { id: 1, name: "Auto-approve under $50", condition: "Amount < $50", action: "Auto Approve", status: "Active", created: "Dec 15, 2023" },
    { id: 2, name: "Manager approval required", condition: "Amount > $500", action: "Require Manager Approval", status: "Active", created: "Dec 10, 2023" },
    { id: 3, name: "Finance review for travel", condition: "Category = Travel", action: "Finance Department Review", status: "Active", created: "Dec 05, 2023" },
  ];

  return (
    <div className="p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Workflow Rules</h1>
            <p className="text-gray-600">Configure automated approval workflows</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
            + Create Rule
          </button>
        </div>

        <div className="space-y-4">
          {workflowRules.map((rule) => (
            <div key={rule.id} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{rule.name}</h3>
                      <p className="text-sm text-gray-500">Created on {rule.created}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold ml-auto">
                      {rule.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-gray-500 text-sm block mb-1">Condition</span>
                      <span className="font-semibold text-gray-800">{rule.condition}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm block mb-1">Action</span>
                      <span className="font-semibold text-gray-800">{rule.action}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all">
                      Edit Rule
                    </button>
                    <button className="px-5 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                      Disable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowRules;