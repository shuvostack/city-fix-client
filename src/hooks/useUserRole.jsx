import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = null, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],

    enabled: !loading && !!user?.email,   // prevent early call

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "citizen";
    },
  });

  return {
    role,
    roleLoading,
    isAdmin: role === "admin",
    isStaff: role === "staff",
    isCitizen: role === "citizen",
  };
};

export default useUserRole;
