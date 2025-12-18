import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  PlusCircle,
  ListTodo,
  User,
  LogOut,
  Menu,
  X,
  Home,
  ChevronRight,
  Users, 
  FileText, 
  Shield, 
  Briefcase,
  UserCog,
  HandCoins,
  CircleGauge,
  CirclePoundSterling, 
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loader from "../components/shared/Loader/Loader";
import { FaRegBuilding } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, isAdmin, isStaff, roleLoading } = useUserRole(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  // -------Citizen, Staff, Admin---------

  // Citizen 
  const citizenItems = [
    {
      name: "Dashboard Overview",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Report Issue",
      path: "/dashboard/add-issue",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "My Issues",
      path: "/dashboard/my-issues",
      icon: <ListTodo size={20} />,
    },
    {
      name: "My Payments",
      path: "/dashboard/my-payments",
      icon: <CirclePoundSterling size={20} />,
      // icon: <ListTodo size={20} />,
    },
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
  ];

  // Admin 
  const adminItems = [
    {
      name: "Admin Overview",
      path: "/dashboard/admin-home",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Manage Users",
      path: "/dashboard/manage-users",
      icon: <Users size={20} />,
    },
    {
      name: "All Issues",
      path: "/dashboard/all-issues",
      icon: <FileText size={20} />,
    },
    {
      name: "Manage Staff",
      path: "/dashboard/manage-staff",
      icon: <UserCog size={20} />,
    },
    {
      name: "Payments",
      path: "/dashboard/payment",
      icon: <HandCoins size={20} />,
    },
    { name: "Profile", path: "/dashboard/profile", icon: <Shield size={20} /> },
  ];

  // Staff 
  const staffItems = [
    {
      name: "Staff Overview",
      path: "/dashboard/staff-home",
      icon: <CircleGauge size={20} />,
    },
    {
      name: "Assigned Tasks",
      path: "/dashboard/assigned-tasks",
      icon: <Briefcase size={20} />,
      // icon: <CircleGauge size={20} />,
    },
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
  ];

  
  let navItems = citizenItems; 
  if (isAdmin) {
    navItems = adminItems;
  }
  else if (isStaff) {
    navItems = staffItems;
  }


  if (roleLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden glass"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform">
              <FaRegBuilding size={20} />
            </div>
            <span className="text-2xl font-bold tracking-wide">
              City<span className="text-primary">Fix</span>
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {isAdmin ? "Admin Menu" : isStaff ? "Staff Menu" : "Citizen Menu"}
          </p>

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}

          <div className="my-6 border-t border-gray-800"></div>

          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            System
          </p>

          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-all"
          >
            <Home size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-600 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.displayName || "User"}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500 truncate max-w-[100px]">
                  {user?.email}
                </p>
                <span className="text-[10px] bg-gray-700 px-1.5 py-0.5 rounded capitalize text-gray-300">
                  {role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogOut}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 z-10">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Page Title */}
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
              {navItems.find((item) => item.path === location.pathname)?.name ||
                "Dashboard"}
            </h2>
          </div>

          {/* Header Right */}
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="text-sm font-bold text-gray-900">
                {user?.displayName?.split(" ")[0]}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.displayName?.charAt(0) || "U"
              )}
            </div>
          </div>
        </header>

        {/* Outlet */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 lg:p-10 relative">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>

          <div className="max-w-7xl mx-auto animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
