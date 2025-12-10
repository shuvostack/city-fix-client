import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Forbidden from "../components/Forbidden/Forbidden";
import Loader from "../components/shared/Loader/Loader";

const StaffRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isStaff, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading)
    return <Loader></Loader>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isStaff) {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default StaffRoute;
