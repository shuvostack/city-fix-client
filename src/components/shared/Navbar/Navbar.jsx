import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaRegBuilding, FaBars } from "react-icons/fa";
import { UserContext } from "../../../context/UserContext";
import useUserRole from "../../../hooks/useUserRole";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, isStaff } = useUserRole();

  const dashboardRoute = isAdmin
    ? "/dashboard/admin-home"
    : isStaff
      ? "/dashboard/staff-home"
      : "/dashboard"


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = ({ isActive }) =>
    `relative text-base font-medium transition-all duration-300 hover:text-primary ${
      isActive ? "text-primary font-bold" : "text-gray-600"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
      isActive ? "after:w-full" : ""
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-issues" className={navLinkStyle}>
          All Issues
        </NavLink>
      </li>
      <li>
        <NavLink to={dashboardRoute} className={navLinkStyle}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkStyle}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkStyle}>
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar min-h-[3rem] px-0">
          {/* Left */}
          <div className="navbar-start w-auto lg:w-1/2 gap-2">
            {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle text-primary"
              >
                <FaBars size={24} />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white rounded-xl w-64 border border-gray-100 gap-2"
              >
                {navLinks}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <FaRegBuilding size={20} />
              </div>
              <div className="leading-tight hidden sm:block">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                  City<span className="text-primary">Fix</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-8 px-1">{navLinks}</ul>
          </div>

          {/* Right */}
          <div className="navbar-end w-auto lg:w-1/2 ml-auto">
            {!user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-5 py-2 text-primary font-semibold hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <button>Login</button>
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  Join Us
                </Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100 hover:scale-105 transition-transform"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="User"
                    />
                  </div>
                </div>

                {/* Profile Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white rounded-xl w-60 border border-gray-100"
                >
                  <li className="p-2 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
                    <div className="flex flex-col gap-0 items-start hover:bg-transparent cursor-default">
                      <span className="font-bold text-gray-800 text-base">
                        {user?.displayName || "Citizen"}
                      </span>
                      <span className="text-xs text-gray-500 truncate w-full">
                        {user?.email}
                      </span>
                    </div>
                  </li>

                  <li className="mt-2">
                    <Link
                      to={dashboardRoute}
                      className="py-3 text-gray-600 hover:text-primary hover:bg-primary/5 active:bg-primary/10 font-medium"
                    >
                      <MdDashboard size={18} />
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={logOut}
                      className="py-3 text-red-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100 font-medium"
                    >
                      <FiLogOut size={18} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
