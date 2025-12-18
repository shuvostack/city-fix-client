import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  MapPin,
  Calendar,
  Filter,
  Flame,
  Activity,
  CheckCircle,
  Search,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";
import useAuth from "../../../hooks/useAuth"

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  
  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/assigned/${user.email}`);
      return res.data;
    },
  });

  
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/issues/status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`Status updated to ${newStatus}`);
        refetch(); 
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  // 3. Filter and sort
  const processedIssues = issues
    .filter((issue) => {
      const matchStatus = statusFilter ? issue.status === statusFilter : true;
      const matchPriority = priorityFilter
        ? issue.priority === priorityFilter
        : true;
      return matchStatus && matchPriority;
    })
    .sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      return new Date(b.date) - new Date(a.date);
    });

  
  const statusOptions = [
    "pending",
    "in-progress",
    "working",
    "resolved",
    "closed",
  ];

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="text-primary" /> Assigned Tasks
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and update status of your assigned reports.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer font-medium text-gray-600 shadow-sm"
            >
              <option value="">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="pl-4 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer font-medium text-gray-600 shadow-sm"
            >
              <option value="">All Priority</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Issue Info</th>
                <th className="p-5">Priority</th>
                <th className="p-5">Current Status</th>
                <th className="p-5">Date</th>
                <th className="p-5 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {processedIssues.map((issue) => (
                <tr
                  key={issue._id}
                  className={`group hover:bg-gray-50/50 transition-colors ${
                    issue.priority === "High" ? "bg-orange-50/10" : ""
                  }`}
                >
                  {/* Issue Info */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={issue.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm line-clamp-1 max-w-[200px]">
                          {issue.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} /> {issue.location}
                          </span>
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-medium border border-gray-200">
                            {issue.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Priority Badge */}
                  <td className="p-5">
                    {issue.priority === "High" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200 animate-pulse">
                        <Flame size={12} fill="currentColor" /> High Priority
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        Normal
                      </span>
                    )}
                  </td>

                  {/* Current Status Badge */}
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold capitalize border
                              ${
                                issue.status === "resolved" ||
                                issue.status === "closed"
                                  ? "bg-green-50 text-green-600 border-green-100"
                                  : issue.status === "working" ||
                                    issue.status === "in-progress"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : "bg-orange-50 text-orange-600 border-orange-100"
                              }
                           `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full 
                                 ${
                                   issue.status === "resolved" ||
                                   issue.status === "closed"
                                     ? "bg-green-500"
                                     : issue.status === "working" ||
                                       issue.status === "in-progress"
                                     ? "bg-blue-500"
                                     : "bg-orange-500"
                                 }
                              `}
                      ></span>
                      {issue.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-5 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(issue.date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Change Status Dropdown */}
                  <td className="p-5 text-right">
                    <div className="relative inline-block w-40">
                      <select
                        value={issue.status}
                        onChange={(e) =>
                          handleStatusChange(issue._id, e.target.value)
                        }
                        className={`w-full appearance-none px-3 py-2 text-xs font-bold text-white rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 transition-colors
                                    ${
                                      issue.status === "resolved" ||
                                      issue.status === "closed"
                                        ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                                        : issue.status === "working" ||
                                          issue.status === "in-progress"
                                        ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                                        : "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500"
                                    }
                                 `}
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-white text-gray-800"
                          >
                            Mark as{" "}
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {processedIssues.length === 0 && (
          <div className="p-10 text-center text-gray-500 flex flex-col items-center">
            <CheckCircle size={40} className="text-gray-300 mb-2" />
            <p>No assigned tasks match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedIssues;
