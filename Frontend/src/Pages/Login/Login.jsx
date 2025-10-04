import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Slice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Users, Shield } from "lucide-react";

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role"); 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Please select your role", { position: "bottom-right" });
      return;
    }

    const userData = { user_id: userId, password, companyId, role: selectedRole };

    try {
      const response = await fetch("https://odooxamalthea.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed", { position: "bottom-right" });
        return;
      }

      const role = (data?.user?.role || "").toLowerCase();

      if (role !== selectedRole.toLowerCase()) {
        toast.error("Selected role doesn't match your account", { position: "bottom-right" });
        return;
      }

      dispatch(loginUser({ user: data.user, token: data.token }));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      toast.success("Login successful!", { position: "bottom-right" });

      setTimeout(() => {
        if (role === "employee") navigate("/employ-dashboard");
        else if (role === "manager") navigate("/manager-dashboard");
        else if (role === "admin") navigate("/admin-dashboard");
        else navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred while logging in. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  const roles = [
    { 
      id: 'employee', 
      label: 'Employee', 
      icon: User,
      color: 'blue'
    },
    { 
      id: 'manager', 
      label: 'Manager', 
      icon: Users,
      color: 'purple'
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      icon: Shield,
      color: 'green'
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col w-full md:w-2/5 h-full">
        <div className="order-1 md:order-1 flex justify-start pl-3 pt-3 w-full">
          <img src="https://res.cloudinary.com/doqzxuxb1/image/upload/v1748249798/Attendance%20And%20Payroll%20Managment/eanj5h57izb4wsvgkzhc.png" alt="Logo" />
        </div>

        <div className="order-3 md:order-2 flex justify-center items-center flex-1">
          <div className="w-9/12 md:w-3/5">
            <h1 className="text-3xl font-bold">Sign-in</h1>
            <form className="flex flex-col mt-4" onSubmit={handleLogin}>
              
              {/* Compact Role Selection */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role *
                </label>
                <div className="flex gap-2">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 transition-all ${
                          isSelected
                            ? role.color === 'blue' 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : role.color === 'purple'
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <Icon className={`w-4 h-4`} />
                        <span className="text-sm font-medium">{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <input
                type="text"
                placeholder="User ID*"
                className="border border-gray-300 p-2 mb-2 rounded w-full"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password*"
                className="border border-gray-300 p-2 mb-2 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company ID*"
                className="border border-gray-300 p-2 mb-2 rounded w-full"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="order-4 md:order-3 mb-8 text-center text-sm">
          Terms and Conditions • Privacy Policy
        </div>
      </div>

      <div className="hidden md:flex md:order-2 w-3/5 h-full justify-center items-center bg-gray-100">
        <img src="https://res.cloudinary.com/doqzxuxb1/image/upload/v1748238957/Attendance%20And%20Payroll%20Managment/y45ltl4yfgxsksuetayk.png" alt="Login Image" />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;