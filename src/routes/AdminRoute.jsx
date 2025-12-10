import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "../context/UserContext";

const AdminRoute = ({ children }) => {
  const { user, dbUser, role, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }


  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }


  if (role !== "admin") {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
};

export default AdminRoute;
