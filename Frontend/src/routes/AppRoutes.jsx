import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import HrLayoutDashboard from "../Components/Layout/CompanyLayout";
import EmployeeLayoutDashboard from "../Components/Layout/EmployeLayout";

// Auth Pages
import Login from "../Pages/Login/Login";

//Not Found Page
import NotFound from '../Components/NotFound'
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
          <Route path="emattendance" element={<Attendance />} />
          <Route path="emsalary" element={<Salary />} />
          <Route path="emcalendar" element={<Calendar />} />
          <Route path="attendance" element={<AttendanceNew />} />
          <Route path="emprofile/:id" element={<Emprofile />} />
          <Route path="emcontect" element={<Contect />} />
        </Route>
      )}

      {/* HR Routes */}
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
      )}
      {/* <Route path="/:id/set-password" element={<SetPassword />} /> */}
      {/* Common/Fallback Route */}
      {/* <Route path="/add" element={<Add />} /> */}
      {/* Optional 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;