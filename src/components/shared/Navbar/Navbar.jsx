import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../../context/UserContext";
import { FaRegBuilding } from "react-icons/fa";
import Logo from "../../Logo/Logo";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-issues" className="font-medium">All Issues</NavLink>
      </li>
      <li>
        <NavLink to="/about" className="font-medium">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="font-medium">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT - Logo */}
        <div className="navbar-start">
          {/* Mobile Menu Button */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            {/* Mobile Menu */}
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52">
              {navLinks}
            </ul>
          </div>

          {/* Logo + Brand Name */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
              <FaRegBuilding size={20} />
            </div>
            <span className="text-2xl font-bold tracking-wide">City<span className="text-primary font-bold">Fix</span></span>
          </Link>
        </div>

        {/* CENTER - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT - User Profile */}
        <div className="navbar-end">
          {!user && (
            <Link to="/login" className="btn btn-primary btn-sm px-5 font-semibold">
              Login
            </Link>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-base-200 transition">

                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />

              </label>

              {/* Profile Dropdown */}
              <ul tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52">

                <li className="mb-1">
                  <div className="font-semibold text-center">
                    {user?.displayName || "User"}
                  </div>
                </li>

                <li>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <MdDashboard /> Dashboard
                  </Link>
                </li>

                <li>
                  <button onClick={logOut}
                    className="flex items-center gap-2 text-red-500">
                    <FiLogOut /> Logout
                  </button>
                </li>

              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
