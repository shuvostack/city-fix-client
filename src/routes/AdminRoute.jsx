import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loader from "../components/shared/Loader/Loader";
import Forbidden from "../components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading)
    return <Loader></Loader>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Forbidden></Forbidden>
  }

  return children;
};

export default AdminRoute;
