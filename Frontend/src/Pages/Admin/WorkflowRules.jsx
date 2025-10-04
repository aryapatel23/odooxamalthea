import React, { useState } from "react";
import { GitBranch, X } from "lucide-react";

const WorkflowRules = () => {
  const [workflowRules, setWorkflowRules] = useState([
    { id: 1, name: "Auto-approve under $50", condition: "Amount < $50", action: "Auto Approve", status: "Active", created: "Dec 15, 2023" },
    { id: 2, name: "Manager approval required", condition: "Amount > $500", action: "Require Manager Approval", status: "Active", created: "Dec 10, 2023" },
    { id: 3, name: "Finance review for travel", condition: "Category = Travel", action: "Finance Department Review", status: "Active", created: "Dec 05, 2023" },
  ]);

  const [editingRule, setEditingRule] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    condition: "",
    action: ""
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRuleForm, setNewRuleForm] = useState({
    name: "",
    condition: "",
    action: ""
  });

  const handleDisable = (ruleId) => {
    setWorkflowRules(workflowRules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === "Active" ? "Disabled" : "Active" }
        : rule
    ));
  };

  const handleEditClick = (rule) => {
    setEditingRule(rule.id);
    setEditForm({
      name: rule.name,
      condition: rule.condition,
      action: rule.action
    });
  };

  const handleSaveEdit = (ruleId) => {
    setWorkflowRules(workflowRules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, ...editForm }
        : rule
    ));
    setEditingRule(null);
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setEditForm({ name: "", condition: "", action: "" });
  };

  const handleCreateRule = () => {
    if (!newRuleForm.name || !newRuleForm.condition || !newRuleForm.action) {
      alert("Please fill in all fields");
      return;
    }
    
    const newRule = {
      id: Math.max(...workflowRules.map(r => r.id)) + 1,
      name: newRuleForm.name,
      condition: newRuleForm.condition,
      action: newRuleForm.action,
      status: "Active",
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    setWorkflowRules([...workflowRules, newRule]);
    setNewRuleForm({ name: "", condition: "", action: "" });
    setShowCreateForm(false);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setNewRuleForm({ name: "", condition: "", action: "" });
  };

  return (
    <div className="p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Workflow Rules</h1>
            <p className="text-gray-600">Configure automated approval workflows</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            + Create Rule
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white border-2 border-indigo-300 rounded-xl p-6 shadow-lg mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-xl">Create New Rule</h3>
                <button onClick={handleCancelCreate} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rule Name</label>
                <input
                  type="text"
                  value={newRuleForm.name}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, name: e.target.value })}
                  placeholder="e.g., Auto-approve small expenses"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                <input
                  type="text"
                  value={newRuleForm.condition}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, condition: e.target.value })}
                  placeholder="e.g., Amount < $100"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Action</label>
                <input
                  type="text"
                  value={newRuleForm.action}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, action: e.target.value })}
                  placeholder="e.g., Auto Approve"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleCreateRule}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Create Rule
                </button>
                <button 
                  onClick={handleCancelCreate}
                  className="px-5 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {workflowRules.map((rule) => (
            <div key={rule.id} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all">
              {editingRule === rule.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Edit Rule</h3>
                    <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rule Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                    <input
                      type="text"
                      value={editForm.condition}
                      onChange={(e) => setEditForm({ ...editForm, condition: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Action</label>
                    <input
                      type="text"
                      value={editForm.action}
                      onChange={(e) => setEditForm({ ...editForm, action: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => handleSaveEdit(rule.id)}
                      className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="px-5 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
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
                      <span className={`px-3 py-1 ${rule.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-full text-xs font-bold ml-auto`}>
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
                      <button 
                        onClick={() => handleEditClick(rule)}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                      >
                        Edit Rule
                      </button>
                      <button 
                        onClick={() => handleDisable(rule.id)}
                        className={`px-5 py-2 border-2 ${rule.status === "Active" ? "border-gray-300 text-gray-700 hover:bg-gray-50" : "border-green-300 text-green-700 hover:bg-green-50"} rounded-lg font-semibold transition-all`}
                      >
                        {rule.status === "Active" ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowRules;