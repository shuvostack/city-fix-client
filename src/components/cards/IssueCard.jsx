import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { MapPin, ThumbsUp, Calendar, ArrowRight, Activity, Tag } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const IssueCard = ({ issue }) => {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const { 
    _id, title, description, category, status, priority, 
    location, upvotes, image, date, reporterEmail, upvotedBy = [] 
  } = issue || {};
  
  const [voteCount, setVoteCount] = useState(upvotes);
  const [isVoted, setIsVoted] = useState(user?.email && upvotedBy.includes(user.email));

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleUpvote = async () => {
    if (!user) {
        toast.error("Please login to vote!");
        return navigate('/auth/login');
    }
    if (user.email === reporterEmail) return toast.error("Cannot vote on your own issue!");
    if (isVoted) return toast.error("Already voted!");

    try {
        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/issues/upvote/${_id}`, {}, 
            { headers: { Authorization: `Bearer ${localStorage.getItem('cityfix-token')}` } }
        );
        if (data.modifiedCount > 0) {
            setVoteCount(prev => prev + 1);
            setIsVoted(true);
            toast.success("Vote added!");
        }
    } catch (error) {
        toast.error("Failed to upvote");
    }
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Image Section - Height Reduced to h-40 for 4-card layout */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

        {priority === 'High' && (
           <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold shadow-sm border border-red-400/50">
             <Activity size={10} /> HIGH
           </div>
        )}

        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>

      {/* Content Section - Padding Reduced to p-4 */}
      <div className="p-4 flex flex-col flex-1">
        
        <div className="flex items-center justify-between text-gray-500 text-xs mb-2 font-medium">
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
             <Calendar size={12} />
             <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md max-w-[50%]">
             <MapPin size={12} className="text-primary" />
             <span className="truncate">{location}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed flex-grow">
          {description}
        </p>

        <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                <Tag size={10} />
                {category}
            </span>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <button 
            onClick={handleUpvote}
            disabled={isVoted || user?.email === reporterEmail}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${isVoted ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <ThumbsUp size={14} className={isVoted ? "fill-current" : ""} />
            <span>{voteCount}</span>
          </button>

          <Link 
            to={`/details/${_id}`} 
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-primary transition-all duration-300 group/btn"
          >
            Details
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;