import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; 
import {
  MapPin, Calendar, User, CheckCircle, Clock, AlertTriangle,
  Edit, Trash2, Rocket, ArrowLeft, Briefcase, Activity,
  Star, MessageSquare, ThumbsUp, Layers, Info
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import Loader from "../../components/shared/Loader/Loader";
import BoostModal from "../IssueDetails/BoostModal";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const navigate = useNavigate();
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);

  // Public Data Fetching 
  const { data: issue = {}, isLoading, refetch } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/issues/${id}`);
      return res.data;
    },
  });

  // Fetch Related Items 
  const { data: relatedIssues = [] } = useQuery({
    queryKey: ["related-issues", issue.category],
    enabled: !!issue.category, 
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/issues?category=${issue.category}&limit=3`);
      return res.data.issues.filter(item => item._id !== id) || []; 
    }
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
          // Delete requires Auth 
          const res = await axiosSecure.delete(`/issues/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Issue has been deleted.", "success");
            navigate("/dashboard/my-issues");
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete issue.");
        }
      }
    });
  };

  if (isLoading) return <Loader />;

  const timelineReversed = issue.timeline ? [...issue.timeline].reverse() : [];

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-10 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Main Content --- */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Header & Image Section */}
            <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
                <div className="relative h-64 md:h-[400px] rounded-2xl overflow-hidden">
                    <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {issue.status}
                    </div>
                </div>
            </div>

            {/* Overview */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <Info className="text-primary" size={24} /> Overview
              </h2>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{issue.title}</h1>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                {issue.description}
              </p>
            </div>

            {/* Key Information */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <Layers className="text-primary" size={24} /> Key Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <Layers size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Category</p>
                        <p className="font-semibold text-gray-800">{issue.category}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Priority</p>
                        <p className="font-semibold text-gray-800">{issue.priority}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
                        <p className="font-semibold text-gray-800">{issue.location}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Report Date</p>
                        <p className="font-semibold text-gray-800">{new Date(issue.date).toLocaleDateString()}</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Community Feedback */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="text-primary" size={24} /> Community Feedback
                </h2>
                
                <div className="flex items-center gap-8 mb-8 border-b border-gray-100 pb-8">
                    <div className="text-center">
                        <span className="text-4xl font-bold text-gray-900 block">{issue.upvotes}</span>
                        <span className="text-sm text-gray-500">Total Upvotes</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-yellow-500 mb-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            <span className="text-gray-400 text-sm ml-2">(Based on votes)</span>
                        </div>
                        <p className="text-gray-600 text-sm">Community members have validated this issue.</p>
                    </div>
                </div>

                {/* Timeline acts as a log of progress */}
                <h3 className="font-bold text-gray-800 mb-4">Progress Log</h3>
                <div className="space-y-6">
                    {timelineReversed.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                <Clock size={14} />
                            </div>
                            {idx !== timelineReversed.length - 1 && <div className="w-0.5 h-full bg-gray-100 my-1"></div>}
                        </div>
                        <div className="pb-6">
                            <p className="font-bold text-gray-800 text-sm">{item.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleString()} by {item.user}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

          </div>

          {/* --- Sidebar --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Action Box (Only visible if logged in and owner) */}
            {user?.email === issue.reporterEmail && (
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-gray-900 font-bold mb-4">Manage Issue</h3>
                    <div className="space-y-3">
                        {issue.priority !== "High" ? (
                             <button
                                onClick={() => setIsBoostModalOpen(true)}
                                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                <Rocket size={18} /> Boost Priority
                            </button>
                        ) : (
                            <button disabled className="w-full py-3 bg-green-50 text-green-600 font-bold rounded-xl border border-green-200 flex items-center justify-center gap-2 cursor-not-allowed">
                                <CheckCircle size={18} /> Priority Boosted
                            </button>
                        )}
                        
                        {issue.status === "pending" && (
                            <button className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                <Edit size={18} /> Edit Issue
                            </button>
                        )}

                        <button
                            onClick={handleDelete}
                            className="w-full py-3 bg-white border-2 border-red-50 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <Trash2 size={18} /> Delete Issue
                        </button>
                    </div>
                </div>
            )}

            {/* Staff Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-4">Assigned Authority</h3>
                {issue.assignedStaff ? (
                    <div className="flex items-center gap-4">
                        <img src={issue.assignedStaff.photo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Staff" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                        <div>
                            <p className="font-bold text-gray-800">{issue.assignedStaff.name}</p>
                            <p className="text-xs text-gray-500">Official Staff</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <User className="mx-auto text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">Pending Assignment</p>
                    </div>
                )}
            </div>

            {/* Reporter Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-4">Reported By</h3>
                <div className="flex items-center gap-3">
                    <img src={issue.reporterPhoto} alt="Reporter" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <p className="text-sm font-bold text-gray-800">{issue.reporterName}</p>
                        <p className="text-xs text-gray-500">Citizen</p>
                    </div>
                </div>
            </div>

          </div>
        </div>

        {/* Related Items */}
        {relatedIssues.length > 0 && (
            <div className="mt-16 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Issues in {issue.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedIssues.map(rel => (
                        <Link to={`/details/${rel._id}`} key={rel._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-40 rounded-xl overflow-hidden mb-4">
                                <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{rel.title}</h3>
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                                <span className="flex items-center gap-1"><MapPin size={12}/> {rel.location}</span>
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">{rel.status}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

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