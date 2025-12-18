import React, { useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Edit,
  Trash2,
  Rocket,
  ArrowLeft,
  Briefcase,
  Activity,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader/Loader";
import BoostModal from "../IssueDetails/BoostModal"

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);

  const {
    data: issue = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });


  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/issues/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Issue has been deleted.", "success");
            navigate("/dashboard/my-issues");
          }
        } catch (error) {
          console.log(error)
          toast.error("Failed to delete issue.");
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

  
  const timelineReversed = issue.timeline ? [...issue.timeline].reverse() : [];

  return (
    <div className="max-w-6xl mx-auto font-sans py-10 my-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Back to List
      </button>

      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 animate-fade-in-down">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-gray-200">
              {issue.category}
            </span>
            {issue.priority === "High" && (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-red-200 flex items-center gap-1">
                <Rocket size={12} /> High Priority
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {issue.title}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {new Date(issue.date).toDateString()}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {issue.location}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`px-6 py-3 rounded-xl border-2 font-bold text-sm uppercase tracking-wide
            ${
              issue.status === "resolved"
                ? "border-green-100 bg-green-50 text-green-600"
                : issue.status === "in-progress"
                ? "border-blue-100 bg-blue-50 text-blue-600"
                : "border-orange-100 bg-orange-50 text-orange-600"
            }`}
        >
          {issue.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left */}
        <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
          <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-80 md:h-[450px]">
            <img
              src={issue.image}
              alt="Issue Evidence"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-primary" size={20} /> Issue
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {issue.description}
            </p>
          </div>

          {/* Timeline Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <Activity className="text-primary" size={20} /> Issue Timeline
            </h3>

            <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
              {timelineReversed.map((item, idx) => (
                <div key={idx} className="relative pl-6">
                  <div
                    className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center
                      ${
                        idx === 0
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "bg-gray-100 text-gray-400"
                      }
                    `}
                  >
                    <Clock size={16} />
                  </div>

                  {/* Content */}
                  <div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded
                      ${
                        item.status === "Boosted"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.status}
                    </span>
                    <h4 className="text-gray-800 font-bold mt-1 text-base">
                      {item.text}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.date).toLocaleString()} • by {item.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Right */}
        <div className="lg:col-span-1 space-y-6 animate-fade-in-up delay-100">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="text-gray-900 font-bold mb-2">Actions</h3>

            {/* Boost button */}
            {issue.priority === "High" ? (
              <button
                disabled
                className="w-full py-3 bg-green-50 text-green-600 font-bold rounded-xl border border-green-200 flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
              >
                <Rocket size={20} /> Already Boosted
              </button>
            ) : (
              <button
                onClick={() => setIsBoostModalOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Rocket size={20} /> Boost Priority (100tk)
              </button>
            )}

          
            {user?.email === issue.reporterEmail && (
              <>
                {issue.status === "pending" && (
                  <button
                    className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={18} /> Edit Issue
                  </button>
                )}

                <button
                  onClick={handleDelete}
                  className="w-full py-3 bg-white border-2 border-red-50 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> Delete Issue
                </button>
              </>
            )}
          </div>

          {/* Staff Info */}
          {issue.assignedStaff ? (
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>

              <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase size={16} /> Assigned Staff
              </h3>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-full border-2 border-white/30 overflow-hidden bg-white/10">
                  <img
                    src={
                      issue.assignedStaff.photo ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="Staff"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    {issue.assignedStaff.name}
                  </h4>
                  <p className="text-xs text-blue-200">
                    {issue.assignedStaff.email}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold">
                    OFFICIAL STAFF
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Not Assigned
            <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-300 text-center">
              <User className="mx-auto text-gray-300 mb-2" size={32} />
              <p className="text-gray-500 font-medium text-sm">
                No staff assigned yet.
              </p>
            </div>
          )}

          {/* Reporter Info */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-gray-900 font-bold mb-4 text-sm uppercase">
              Reporter
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={issue.reporterPhoto}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {issue.reporterName}
                </p>
                <p className="text-xs text-gray-500">{issue.reporterEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {isBoostModalOpen && (
        <BoostModal
          issueId={id}
          closeModal={() => {
            setIsBoostModalOpen(false);
            refetch(); 
          }}
        />
      )}
    </div>
  );
};

export default IssueDetails;
