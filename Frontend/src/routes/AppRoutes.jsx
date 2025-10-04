// // import React from "react";
// // import { Routes, Route } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // // Layouts
// // import HrLayoutDashboard from "../Components/Layout/CompanyLayout";
// // import EmployeeLayoutDashboard from "../Components/Layout/EmployeLayout";

// // // Auth Pages
// // import Login from "../Pages/Login/Login";


// // // Employee Pages
// // import Dashboard from "../Pages/Employee/EmployeeDashboard";
// // import ExpenseHistory from "../Pages/Employee/ExpenseHistory";
// // // import Attendance from "../Pages/Employee/Attendance";
// // // import Salary from "../Pages/Employee/Salary";
// // // import Calendar from "../Pages/Employee/Calendar";
// // // import AttendanceNew from "../Components/attendance";
// // // import Emprofile from "../Pages/Employee/Emprofile";
// // // import SetPassword from "../Pages/Employee/Email";
// // // Common / Temp
// // // import Add from "../Pages/Add";

// // //Manager Pages
// // import ManagerLayoutDashboard from "../Components/Layout/ManagerLayout";
// // import ManagerDashboard from "../Pages/Manager/ManagerDashboard";


// // //Not Found Page
// // import NotFound from '../Components/NotFound'
// // import SubmitExpenseForm from "../Pages/Employee/SubmitExpenseForm";
// // // import Contect from "../Pages/Employee/Contect";

// // const AppRoutes = () => {
// //   const token = useSelector((state) => state.auth.token);
// //   const user = useSelector((state) => state.auth.user);
// //   const role = user?.role?.toLowerCase();
// //   const isAuthenticated = !!token;

// //   return (
// //     <Routes>
// //       <Route path="/" element={<Login />} />

// //       {/* Employee Routes */}
// //       {isAuthenticated && role === "employee" && (
// //         <Route path="/" element={<EmployeeLayoutDashboard />}>
// //           <Route path="emhome" element={<Dashboard />} />
// //           {/* <Route path="my-expenses" element={<MyExpenses />} /> */}
// //           <Route path="submit-expense" element={<SubmitExpenseForm />} />
// //           <Route path="expense-history" element={<ExpenseHistory />} />
// //         </Route>
// //       )}

// //       {/* Manager Routes */}
// //       {isAuthenticated && role === "hr" && (
// //         <Route path="/" element={<ManagerLayoutDashboard />}>
// //           <Route path="mghome" element={<ManagerDashboard />} />
// //           {/* <Route path="my-expenses" element={<MyExpenses />} /> */}
// //           <Route path="submit-expense" element={<SubmitExpenseForm />} />
// //         </Route>
// //       )}

// //       {/* HR Routes
// //       {isAuthenticated && role === "hr" && (
// //         <Route path="/" element={<HrLayoutDashboard />}>
// //           <Route path="hrhome" element={<HRDashboard />} />
// //           <Route path="hremployees" element={<Employees />} />
// //           <Route path="hraddemployee" element={<AddEmployee />} />
// //           <Route path="hrpayrollsystem" element={<PayrollSystem />} />
// //           <Route path="hrcalendar" element={<HRCalendar />} />
// //           <Route path="hremployees/profile/:id" element={<EmployeeDashboard />} />
// //           <Route path="payrollsystem/profile/:id" element={<PayrollPage/>}/>
// //           <Route path="hrprofile/:id" element={<Hrprofile />} />
// //           <Route path="hrquery" element={<Query />} />
// //         </Route>
// //       )} */}
// //       {/* <Route path="/:id/set-password" element={<SetPassword />} /> */}
// //       {/* Common/Fallback Route */}
// //       {/* <Route path="/add" element={<Add />} /> */}
// //       {/* Optional 404 Page */}
// //       <Route path="*" element={<NotFound />} />
// //       {/* <Route path="/emhome" element={<Dashboard />} /> */}
// //     </Routes>
// //   );
// // };

// // export default AppRoutes;



// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";

// // Context
// import { ExpenseProvider } from "../context/ExpenseContext"; // ✅ added

// // Layouts
// import HrLayoutDashboard from "../Components/Layout/AdminLayout";
// import EmployeeLayoutDashboard from "../Components/Layout/EmployeLayout";

// // Auth Pages
// import Login from "../Pages/Login/Login";

// // Employee Pages
// import Dashboard from "../Pages/Employee/EmployeeDashboard";
// import ExpenseHistory from "../Pages/Employee/ExpenseHistory";
// import SubmitExpenseForm from "../Pages/Employee/SubmitExpenseForm";
// import OCR from "../Pages/Employee/OCRUploader";
// // import Attendance from "../Pages/Employee/Attendance";
// // import Salary from "../Pages/Employee/Salary";
// // import Calendar from "../Pages/Employee/Calendar";
// // import AttendanceNew from "../Components/attendance";
// // import Emprofile from "../Pages/Employee/Emprofile";
// // import SetPassword from "../Pages/Employee/Email";
// // Common / Temp
// // import Add from "../Pages/Add";

// // Manager Pages
// import ManagerLayoutDashboard from "../Components/Layout/ManagerLayout";
// import ManagerDashboard from "../Pages/Manager/ManagerDashboard";
// import TeamExpenses from "../Pages/Manager/TeamExpenses";

// //Admin pages
// import WorkflowRules from "../Pages/Admin/WorkflowRules";
// import AdminDashboard from "../Pages/Admin/AdminDashboard";
// import UserManagement from "../Pages/Admin/UserManagement";
// import ExpenseReports from "../Pages/Admin/ExpenseOverview";

// // Not Found Page
// import NotFound from '../Components/NotFound';
// import ExpenseApprovalPage from "../Pages/Manager/Approvals";
// // import Contect from "../Pages/Employee/Contect";

// const AppRoutes = () => {
//   const token = useSelector((state) => state.auth.token);
//   const user = useSelector((state) => state.auth.user);
//   const role = user?.role?.toLowerCase();
//   const isAuthenticated = !!token;

//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />

//       {/* Employee Routes */}
//       {isAuthenticated && role === "employee" && (
//         <Route
//           path="/"
//           element={
//             <ExpenseProvider>
//               <EmployeeLayoutDashboard />
//             </ExpenseProvider>
//           }
//         >
//           <Route path="employ-dashboard" element={<Dashboard />} />
//           {/* <Route path="my-expenses" element={<MyExpenses />} /> */}
//           <Route path="submit-expense" element={<SubmitExpenseForm />} />
//           <Route path="expense-history" element={<ExpenseHistory />} />
//           <Route path="ocr" element={<OCR />} />
//         </Route>
//       )}

//       {/* Manager Routes */}
//       {isAuthenticated && role === "manager" && (
//         <Route path="/" element={<ManagerLayoutDashboard />}>
//           <Route path="manager-dashboard" element={<ManagerDashboard />} />
//           <Route path="manager-approvals" element={<ExpenseApprovalPage />} />
//           <Route path="manager-team-expenses" element={<TeamExpenses />} />
//         </Route>
//       )}

//       {/* Admin Routes */}
//       {isAuthenticated && role === "admin" && (
//         <Route path="/" element={<HrLayoutDashboard />}>
//           <Route path="admin-dashboard" element={<AdminDashboard />} />
//           <Route path="user-management" element={<UserManagement />} />
//           <Route path="workflow-rules" element={<WorkflowRules />} />
//           <Route path="expense-overview" element={<ExpenseReports />} />
//         </Route>
//       )}

//       {/* HR Routes
//       {isAuthenticated && role === "hr" && (
//         <Route path="/" element={<HrLayoutDashboard />}>
//           <Route path="hrhome" element={<HRDashboard />} />
//           <Route path="hremployees" element={<Employees />} />
//           <Route path="hraddemployee" element={<AddEmployee />} />
//           <Route path="hrpayrollsystem" element={<PayrollSystem />} />
//           <Route path="hrcalendar" element={<HRCalendar />} />
//           <Route path="hremployees/profile/:id" element={<EmployeeDashboard />} />
//           <Route path="payrollsystem/profile/:id" element={<PayrollPage/>}/>
//           <Route path="hrprofile/:id" element={<Hrprofile />} />
//           <Route path="hrquery" element={<Query />} />
//         </Route>
//       )} */}
//       {/* <Route path="/:id/set-password" element={<SetPassword />} /> */}
//       {/* Common/Fallback Route */}
//       {/* <Route path="/add" element={<Add />} /> */}
//       {/* Optional 404 Page */}
//       <Route path="*" element={<NotFound />} />
//       {/* <Route path="/emhome" element={<Dashboard />} /> */}
//     </Routes>
//   );
// };

// export default AppRoutes;



import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Context
import { ExpenseProvider } from "../context/ExpenseContext";

// Layouts
import HrLayoutDashboard from "../Components/Layout/AdminLayout";
import EmployeeLayoutDashboard from "../Components/Layout/EmployeLayout";
import ManagerLayoutDashboard from "../Components/Layout/ManagerLayout";

// Auth Pages
import Login from "../Pages/Login/Login";

// Employee Pages
import Dashboard from "../Pages/Employee/EmployeeDashboard";
import ExpenseHistory from "../Pages/Employee/ExpenseHistory";
import SubmitExpenseForm from "../Pages/Employee/SubmitExpenseForm";
import OCR from "../Pages/Employee/OCRUploader";

// Manager Pages
import ManagerDashboard from "../Pages/Manager/ManagerDashboard";
import ExpenseApprovalPage from "../Pages/Manager/Approvals";
import TeamExpenses from "../Pages/Manager/TeamExpenses";

// Admin Pages
import WorkflowRules from "../Pages/Admin/WorkflowRules";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import UserManagement from "../Pages/Admin/UserManagement";
import ExpenseReports from "../Pages/Admin/ExpenseOverview";

// Common
import NotFound from "../Components/NotFound";

const AppRoutes = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role?.toLowerCase();
  const isAuthenticated = !!token;

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes with Context */}
      {isAuthenticated && (
        <Route
          path="/"
          element={
            <ExpenseProvider>
              {/* Different layout loads based on role */}
              {role === "employee" && <EmployeeLayoutDashboard />}
              {role === "manager" && <ManagerLayoutDashboard />}
              {role === "admin" && <HrLayoutDashboard />}
            </ExpenseProvider>
          }
        >
          {/* Employee Routes */}
          {role === "employee" && (
            <>
              <Route path="employ-dashboard" element={<Dashboard />} />
              <Route path="submit-expense" element={<SubmitExpenseForm />} />
              <Route path="expense-history" element={<ExpenseHistory />} />
              <Route path="ocr" element={<OCR />} />
            </>
          )}

          {/* Manager Routes */}
          {role === "manager" && (
            <>
              <Route path="manager-dashboard" element={<ManagerDashboard />} />
              <Route path="manager-approvals" element={<ExpenseApprovalPage />} />
              <Route path="manager-team-expenses" element={<TeamExpenses />} />
            </>
          )}

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <Route path="admin-dashboard" element={<AdminDashboard />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="workflow-rules" element={<WorkflowRules />} />
              <Route path="expense-overview" element={<ExpenseReports />} />
            </>
          )}
        </Route>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;