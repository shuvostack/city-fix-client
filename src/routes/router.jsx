
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";


// import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";
// import StaffRoute from "./StaffRoute";

// Pages
// import Home from "../pages/Home/Home";
// import AllIssues from "../pages/AllIssues/AllIssues";
// import IssueDetails from "../pages/IssueDetails/IssueDetails";

// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";

// import Extra1 from "../pages/Extra1/Extra1";
// import Extra2 from "../pages/Extra2/Extra2";

// import NotFound from "../pages/ErrorPage/NotFound";

// Dashboard Pages
// import CitizenDashboardHome from "../pages/Dashboard/Citizen/DashboardHome";
// import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
// import ReportIssue from "../pages/Dashboard/Citizen/ReportIssue";
// import CitizenProfile from "../pages/Dashboard/Citizen/Profile";

// import StaffDashboard from "../pages/Dashboard/Staff/StaffDashboard";
// import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";
// import StaffProfile from "../pages/Dashboard/Staff/StaffProfile";

// import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
// import AllIssuesAdmin from "../pages/Dashboard/Admin/AllIssuesAdmin";
// import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
// import ManageStaff from "../pages/Dashboard/Admin/ManageStaff";
// import Payments from "../pages/Dashboard/Admin/Payments";
// import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";


const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, path: "/", element: <Home></Home> },
    //   { path: "/all-issues", element: <AllIssues /> },
    //   { path: "/details/:id", element: 
    //       <PrivateRoute><IssueDetails /></PrivateRoute> 
    //   },

    //   { path: "/about", element: <Extra1 /> },
    //   { path: "/contact", element: <Extra2 /> },

    //   { path: "/login", element: <Login /> },
    //   { path: "/register", element: <Register /> },
    ],
  },

  // DASHBOARD ROUTES
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),

//     children: [
//       // CITIZEN
//       { path: "home", element: <CitizenDashboardHome /> },
//       { path: "my-issues", element: <MyIssues /> },
//       { path: "report-issue", element: <ReportIssue /> },
//       { path: "profile", element: <CitizenProfile /> },

//       // STAFF
//       {
//         path: "staff/home",
//         element: (
//           <StaffRoute>
//             <StaffDashboard />
//           </StaffRoute>
//         ),
//       },
//       {
//         path: "staff/issues",
//         element: (
//           <StaffRoute>
//             <AssignedIssues />
//           </StaffRoute>
//         ),
//       },
//       {
//         path: "staff/profile",
//         element: (
//           <StaffRoute>
//             <StaffProfile />
//           </StaffRoute>
//         ),
//       },

//       // ADMIN
//       {
//         path: "admin/home",
//         element: (
//           <AdminRoute>
//             <AdminDashboard />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "admin/all-issues",
//         element: (
//           <AdminRoute>
//             <AllIssuesAdmin />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "admin/manage-users",
//         element: (
//           <AdminRoute>
//             <ManageUsers />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "admin/manage-staff",
//         element: (
//           <AdminRoute>
//             <ManageStaff />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "admin/payments",
//         element: (
//           <AdminRoute>
//             <Payments />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "admin/profile",
//         element: (
//           <AdminRoute>
//             <AdminProfile />
//           </AdminRoute>
//         ),
//       },
//     ],
//   },

//   // 404 PAGE
//   { path: "*", element: <NotFound /> },
]);

export default router;
