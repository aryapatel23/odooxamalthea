import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import HrLayoutDashboard from "../Components/Layout/CompanyLayout";
import EmployeeLayoutDashboard from "../Components/Layout/EmployeLayout";

// Auth Pages
import Login from "../Pages/Login/Login";

// HR Pages
// import HRDashboard from "../Pages/Admin/HrDashboard";
// import Employees from "../Pages/Admin/Employees";
// import AddEmployee from "../Pages/Admin/AddEmployee";
// import PayrollSystem from "../Pages/Admin/Payrollsystem";
// import HRCalendar from "../Pages/Admin/HRCalendar";
// import EmployeeDashboard from '../Pages/Admin/EmployeePage'
// import PayrollPage from "../Pages/Admin/PayrollPage";
// import Hrprofile from "../Pages/Admin/HrProfile";
// import Query from "../Pages/Admin/Query";

// Employee Pages
import Dashboard from "../Pages/Employee/EmployeeDashboard";
// import Attendance from "../Pages/Employee/Attendance";
// import Salary from "../Pages/Employee/Salary";
// import Calendar from "../Pages/Employee/Calendar";
// import AttendanceNew from "../Components/attendance";
// import Emprofile from "../Pages/Employee/Emprofile";
// import SetPassword from "../Pages/Employee/Email";
// Common / Temp
// import Add from "../Pages/Add";

//Manager Pages
import ManagerLayoutDashboard from "../Components/Layout/ManagerLayout";
import ManagerDashboard from "../Pages/Manager/ManagerDashboard";


//Not Found Page
import NotFound from '../Components/NotFound'
import SubmitExpenseForm from "../Pages/Employee/SubmitExpenseForm";
// import Contect from "../Pages/Employee/Contect";

const AppRoutes = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role?.toLowerCase();
  const isAuthenticated = !!token;

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Employee Routes */}
      {isAuthenticated && role === "employee" && (
        <Route path="/" element={<EmployeeLayoutDashboard />}>
          <Route path="emhome" element={<Dashboard />} />
          {/* <Route path="my-expenses" element={<MyExpenses />} /> */}
          <Route path="submit-expense" element={<SubmitExpenseForm />} />
        </Route>
      )}

      {/* Employee Routes */}
      {isAuthenticated && role === "hr" && (
        <Route path="/" element={<ManagerLayoutDashboard />}>
          <Route path="mghome" element={<ManagerDashboard />} />
          {/* <Route path="my-expenses" element={<MyExpenses />} /> */}
          <Route path="submit-expense" element={<SubmitExpenseForm />} />
        </Route>
      )}

      {/* HR Routes
      {isAuthenticated && role === "hr" && (
        <Route path="/" element={<HrLayoutDashboard />}>
          <Route path="hrhome" element={<HRDashboard />} />
          <Route path="hremployees" element={<Employees />} />
          <Route path="hraddemployee" element={<AddEmployee />} />
          <Route path="hrpayrollsystem" element={<PayrollSystem />} />
          <Route path="hrcalendar" element={<HRCalendar />} />
          <Route path="hremployees/profile/:id" element={<EmployeeDashboard />} />
          <Route path="payrollsystem/profile/:id" element={<PayrollPage/>}/>
          <Route path="hrprofile/:id" element={<Hrprofile />} />
          <Route path="hrquery" element={<Query />} />
        </Route>
      )} */}
      {/* <Route path="/:id/set-password" element={<SetPassword />} /> */}
      {/* Common/Fallback Route */}
      {/* <Route path="/add" element={<Add />} /> */}
      {/* Optional 404 Page */}
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/emhome" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default AppRoutes;