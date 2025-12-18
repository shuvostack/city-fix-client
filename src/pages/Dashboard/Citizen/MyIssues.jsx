import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Calendar,
  Trash2,
  Eye,
  ThumbsUp,
  Plus,
  Search,
  Filter,
  Edit,
  X,
  Save,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";

const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);

  
  const fetchMyIssues = async () => {
    try {
      const res = await axiosSecure.get(`/issues/my-issues/${user.email}`);
      setIssues(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyIssues();
  }, [user, axiosSecure]);

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/issues/${id}`);
          if (res.data.deletedCount > 0) {
            setIssues((prev) => prev.filter((issue) => issue._id !== id));
            Swal.fire(
              "Deleted!",
              "Your reported issue has been deleted.",
              "success"
            );
          }
        } catch (error) {
          console.log(error)
          Swal.fire("Error!", "Failed to delete issue.", "error");
        }
      }
    });
  };

  
  const openEditModal = (issue) => {
    setEditingIssue(issue);
    setIsModalOpen(true);
  };

  // Filter 
  const filteredIssues = issues.filter((issue) => {
    const matchSearch =
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? issue.status === filterStatus : true;
    const matchCategory = filterCategory
      ? issue.category === filterCategory
      : true;

    return matchSearch && matchStatus && matchCategory;
  });

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans relative">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Reports</h1>
          <p className="text-gray-500 mt-1">
            Manage and track the status of your submitted issues.
          </p>
        </div>
        <Link
          to="/dashboard/add-issue"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-primary/30"
        >
          <Plus size={18} /> Report New Issue
        </Link>
      </div>

     
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
        <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-4 bg-gray-50/50">
          {/* Search */}
          <div className="relative w-full xl:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            {/* Category Filter */}
            <div className="relative w-full sm:w-48">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Roads">Roads</option>
                <option value="Lighting">Lighting</option>
                <option value="Water">Water</option>
                <option value="Waste">Waste</option>
                <option value="Safety">Safety</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative w-full sm:w-48">
              <CheckCircle
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {filteredIssues.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5">Issue Details</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-center">Votes</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredIssues.map((issue) => (
                  <tr
                    key={issue._id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    {/* Image & Title */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                          <img
                            src={issue.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm line-clamp-1 max-w-[180px]">
                            {issue.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin size={12} />{" "}
                            <span className="truncate max-w-[150px]">
                              {issue.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-5">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
                        {issue.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-5">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(issue.date).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize
                          ${
                            issue.status === "resolved"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : issue.status === "in-progress"
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : "bg-orange-100 text-orange-700 border border-orange-200"
                          }
                       `}
                      >
                        {issue.status}
                      </span>
                    </td>

                    {/* Votes */}
                    <td className="p-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-bold text-xs">
                        <ThumbsUp size={12} /> {issue.upvotes}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex items-center justify-end gap-2">
                        {/* View */}
                        <Link
                          to={`/details/${issue._id}`}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>

                        {/* Edit Button (Only if Pending) */}
                        {issue.status === "pending" && (
                          <button
                            onClick={() => openEditModal(issue)}
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                            title="Edit Issue"
                          >
                            <Edit size={16} />
                          </button>
                        )}

                        {/* Delete */}
                        {issue.status !== "resolved" && (
                          <button
                            onClick={() => handleDelete(issue._id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete Issue"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50/50">
            <Search className="text-gray-300 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-700">
              No issues match criteria
            </h3>
            <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </div>

      
      {isModalOpen && (
        <EditIssueModal
          issue={editingIssue}
          closeModal={() => setIsModalOpen(false)}
          axiosSecure={axiosSecure}
          refetch={fetchMyIssues}
        />
      )}
    </div>
  );
};


// Edit Modal
const EditIssueModal = ({ issue, closeModal, axiosSecure, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: issue?.title,
      description: issue?.description,
      location: issue?.location,
      category: issue?.category,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/issues/${issue._id}`, data);

      if (res.data.modifiedCount > 0) {
        toast.success("Issue updated successfully!");
        refetch(); 
        closeModal();
      } else {
        toast.error("No changes made.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update issue.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-zoom-in">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Edit size={18} className="text-primary" /> Edit Issue
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary outline-none"
            />
            {errors.title && (
              <span className="text-red-500 text-xs">Title is required</span>
            )}
          </div>

         
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary outline-none"
              >
                <option value="Roads">Roads</option>
                <option value="Lighting">Lighting</option>
                <option value="Water">Water</option>
                <option value="Waste">Waste</option>
                <option value="Safety">Safety</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Location
              </label>
              <input
                {...register("location", { required: true })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Description
            </label>
            <textarea
              rows="4"
              {...register("description", { required: true })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary outline-none resize-none"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-xs">
                Description is required
              </span>
            )}
          </div>

          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyIssues;
