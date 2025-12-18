import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  MapPin,
  UserPlus,
  Trash2,
  CheckCircle,
  X,
  User,
  Search,
  XCircle,
  AlertTriangle,
  Flame,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";

const AllIssuesAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

// all
  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-issues-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues?limit=1000");
      return res.data.issues;
    },
  });

 // staff
  const { data: staffMembers = [] } = useQuery({
    queryKey: ["staff-list"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/staff");
      return res.data;
    },
  });


  const filteredAndSortedIssues = issues
    .filter(
      (issue) =>
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority !== "High" && b.priority === "High") return 1;
      return new Date(b.date) - new Date(a.date);
    });


  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this report?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/issues/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Issue has been removed.", "success");
          }
        } catch (error) {
          toast.error("Failed to delete issue.");
        }
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this Issue?",
      text: "This will mark the issue as cancelled/rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/issues/status/${id}`, {
            status: "rejected",
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Issue Rejected Successfully.");
          }
        } catch (error) {
          toast.error("Failed to reject issue.");
        }
      }
    });
  };

  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-primary" /> Manage Issues
          </h1>
          <p className="text-gray-500 mt-1">
            Assign staff, reject spam, and track progress.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search issues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Issue Details</th>
                <th className="p-5">Priority</th> 
                <th className="p-5">Status</th>
                <th className="p-5">Assigned To</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAndSortedIssues.map((issue) => (
                <tr
                  key={issue._id}
                  className={`group hover:bg-gray-50/50 transition-colors ${
                    issue.priority === "High" ? "bg-orange-50/30" : ""
                  }`}
                >
                  {/* Details */}
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
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                            {issue.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="p-5">
                    {issue.priority === "High" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200 animate-pulse">
                        <Flame size={12} /> High
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                        Normal
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold capitalize border
                              ${
                                issue.status === "resolved"
                                  ? "bg-green-50 text-green-600 border-green-100"
                                  : issue.status === "rejected"
                                  ? "bg-red-50 text-red-600 border-red-100"
                                  : issue.status === "in-progress"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : "bg-orange-50 text-orange-600 border-orange-100"
                              }
                           `}
                    >
                      {issue.status}
                    </span>
                  </td>

                  {/* Assigned */}
                  <td className="p-5">
                    {issue.assignedStaff ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            issue.assignedStaff.photo ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt=""
                          className="w-8 h-8 rounded-full border border-gray-200"
                        />
                        <div className="text-xs">
                          <p className="font-bold text-gray-800">
                            {issue.assignedStaff.name}
                          </p>
                          <p className="text-gray-500">Assigned</p>
                        </div>
                      </div>
                    ) : 
                    issue.status !== "rejected" &&
                      issue.status !== "resolved" ? (
                      <button
                        onClick={() => openAssignModal(issue)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-primary hover:text-white transition-all text-xs font-bold border border-blue-100 flex items-center gap-1"
                      >
                        <UserPlus size={14} /> Assign Staff
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">--</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {issue.status === "pending" && (
                        <button
                          onClick={() => handleReject(issue._id)}
                          className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors tooltip tooltip-left"
                          data-tip="Reject Issue"
                        >
                          <XCircle size={16} />
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(issue._id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors tooltip tooltip-left"
                        data-tip="Delete Permanently"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* assign staff modal */}
      {isModalOpen && (
        <AssignStaffModal
          issue={selectedIssue}
          staffMembers={staffMembers}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
          axiosSecure={axiosSecure}
        />
      )}
    </div>
  );
};


// Assign Modal
const AssignStaffModal = ({
  issue,
  staffMembers,
  closeModal,
  refetch,
  axiosSecure,
}) => {
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!selectedStaffId) return toast.error("Please select a staff member!");

    const staff = staffMembers.find((s) => s._id === selectedStaffId);

    setLoading(true);
    try {
      const res = await axiosSecure.patch(`/issues/assign/${issue._id}`, {
        staff: {
          name: staff.name,
          email: staff.email,
          photo: staff.photo,
          uid: staff._id,
        },
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Assigned to ${staff.name}`);
        refetch();
        closeModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign staff.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-zoom-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            Assign Staff Member
          </h3>
          <button onClick={closeModal}>
            <X size={20} className="text-gray-400 hover:text-red-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-xl mb-6 flex items-center gap-3">
            <img
              src={issue.image}
              alt=""
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-bold text-gray-800 line-clamp-1">
                {issue.title}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <AlertTriangle
                  size={10}
                  className={
                    issue.priority === "High" ? "text-red-500" : "text-gray-400"
                  }
                />
                Priority: {issue.priority}
              </p>
            </div>
          </div>

          <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
            Select Available Staff
          </label>
          <div className="relative">
            <select
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none appearance-none cursor-pointer"
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
            >
              <option value="">-- Choose a Staff Member --</option>
              {staffMembers.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name} ({staff.email})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <User size={16} />
            </div>
          </div>

          {staffMembers.length === 0 && (
            <p className="text-xs text-red-500 mt-2 bg-red-50 p-2 rounded">
              ⚠ No staff found. Please check Manage Users.
            </p>
          )}

          <button
            onClick={handleAssign}
            disabled={loading || staffMembers.length === 0}
            className="w-full mt-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <CheckCircle size={18} />
            )}
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllIssuesAdmin;
