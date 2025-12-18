
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/ErrorPage/NotFound";
import AllIssues from "../pages/AllIssues/AllIssues";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/Dashboard/Citizen/DashboardHome";
import ReportIssue from "../pages/Dashboard/Citizen/ReportIssue";
import Profile from "../pages/Dashboard/Citizen/Profile";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AllIssuesAdmin from "../pages/Dashboard/Admin/AllIssuesAdmin";
import ManageStaff from "../pages/Dashboard/Admin/ManageStaff";
import StaffRoute from "./StaffRoute";
import StaffDashboard from "../pages/Dashboard/Staff/StaffDashboard";
import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";
import Payments from "../pages/Dashboard/Admin/Payments";
import MyPayments from "../pages/Dashboard/Citizen/MyPayments";


const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, path: "/", element: <Home></Home> },
      { path: "/all-issues", element: <AllIssues></AllIssues> },
      { path: "/details/:id", element: 
          <PrivateRoute><IssueDetails></IssueDetails></PrivateRoute> 
      },

      { path: "/about", element: <About></About> },
      { path: "/contact", element: <Contact></Contact> },

    ],
  },

  // auth layout
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
    ]
  },

  // DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // CITIZEN
      { path: "/dashboard", element: <DashboardHome></DashboardHome> },
      { path: "/dashboard/my-issues", element: <MyIssues></MyIssues> },
      { path: "/dashboard/add-issue", element: <ReportIssue></ReportIssue> },
      { path: "/dashboard/my-payments", element: <MyPayments></MyPayments> },
      { path: "/dashboard/profile", element: <Profile></Profile> },

//    // STAFF
      {
        path: "/dashboard/staff-home",
        element: (
          <StaffRoute>
            <StaffDashboard></StaffDashboard>
          </StaffRoute>
        ),
      },
      {
        path: "/dashboard/assigned-tasks",
        element: (
          <StaffRoute>
            <AssignedIssues></AssignedIssues>
          </StaffRoute>
        ),
      },


//       // ADMIN
      {
        path: "/dashboard/admin-home",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-issues",
        element: (
          <AdminRoute>
            <AllIssuesAdmin></AllIssuesAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-staff",
        element: (
          <AdminRoute>
            <ManageStaff></ManageStaff>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment",
        element: <Payments></Payments>
      },
    ],
  },

//   // 404 PAGE
  { path: "*", element: <NotFound /> },
]);

export default router;
