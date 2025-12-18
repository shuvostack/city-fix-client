import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Users,
  Shield,
  UserCheck,
  UserX,
  Search,
  CheckCircle,
  Briefcase,
  Crown,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); 

  
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;

    return matchesSearch && matchesRole;
  });

  
  const handleRoleUpdate = (user, newRole) => {
    Swal.fire({
      title: `Promote to ${newRole}?`,
      text: `Are you sure you want to make ${user.name} a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/admin/${user._id}`, {
            role: newRole,
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success(`Role updated to ${newRole}`);
          }
        } catch (error) {
          console.log(error)
          toast.error("Failed to update role.");
        }
      }
    });
  };

  
  const handleBlockStatus = (user) => {
    const isBlocked = user.isBlocked;

    Swal.fire({
      title: isBlocked ? "Unblock this User?" : "Block this User?",
      text: isBlocked
        ? "This user will regain access to the platform."
        : "This user will be banned and cannot login anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: isBlocked ? "Yes, Unblock User" : "Yes, Block User",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/admin/${user._id}`, {
            isBlocked: !isBlocked,
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire(
              isBlocked ? "Unblocked!" : "Blocked!",
              `User has been ${
                isBlocked ? "unblocked" : "blocked"
              } successfully.`,
              "success"
            );
          }
        } catch (error) {
          console.log(error)
          toast.error("Action failed.");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-primary" /> Manage Users
          </h1>
          <p className="text-gray-500 mt-1">
            Control user access, roles, and subscriptions.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 w-full md:w-auto">
          {/* Role */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer h-full"
            >
              <option value="">All Users</option>
              <option value="citizen">Citizens Only</option>
              <option value="staff">Staff Only</option>
              <option value="admin">Admins Only</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">User Profile</th>
                <th className="p-5">Role</th>
                <th className="p-5">Subscription Info</th> 
                <th className="p-5">Account Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  {/* User Profile */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          user.photo || "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt=""
                        className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {user.name}
                        </h4>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize border
                              ${
                                user.role === "admin"
                                  ? "bg-purple-50 text-purple-600 border-purple-100"
                                  : user.role === "staff"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                              }
                           `}
                    >
                      {user.role === "admin" ? (
                        <Shield size={12} />
                      ) : user.role === "staff" ? (
                        <Briefcase size={12} />
                      ) : (
                        <Users size={12} />
                      )}
                      {user.role || "Citizen"}
                    </span>
                  </td>

                  {/* Subscription Info */}
                  <td className="p-5">
                    {user.isVerified ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                          <Crown size={16} fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-orange-600 uppercase">
                            Premium
                          </p>
                          <p className="text-[10px] text-gray-400">
                            Verified Member
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase">
                            Basic
                          </p>
                          <p className="text-[10px] text-gray-400">
                            Free Account
                          </p>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Account Status */}
                  <td className="p-5">
                    {user.isBlocked ? (
                      <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold border border-red-100">
                        <UserX size={12} /> Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold border border-green-100">
                        <CheckCircle size={12} /> Active
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Role Buttons */}
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleRoleUpdate(user, "admin")}
                          className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors tooltip tooltip-left"
                          data-tip="Make Admin"
                        >
                          <Shield size={16} />
                        </button>
                      )}

                      {user.role !== "staff" && (
                        <button
                          onClick={() => handleRoleUpdate(user, "staff")}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors tooltip tooltip-left"
                          data-tip="Make Staff"
                        >
                          <Briefcase size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => handleBlockStatus(user)}
                        className={`p-2 rounded-lg transition-colors tooltip tooltip-left
                                    ${
                                      user.isBlocked
                                        ? "bg-green-50 text-green-600 hover:bg-green-100"
                                        : "bg-red-50 text-red-600 hover:bg-red-100"
                                    }
                                `}
                        data-tip={
                          user.isBlocked ? "Unblock User" : "Block User"
                        }
                      >
                        {user.isBlocked ? (
                          <UserCheck size={16} />
                        ) : (
                          <UserX size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-10 text-center flex flex-col items-center justify-center text-gray-500">
            <Search size={40} className="text-gray-300 mb-2" />
            <p>No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
