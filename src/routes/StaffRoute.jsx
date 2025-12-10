import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "../context/UserContext";

const StaffRoute = ({ children }) => {
  const { user, role, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // user not logged in -> login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Role check (must be staff)
  if (role !== "staff") {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
};

export default StaffRoute;
