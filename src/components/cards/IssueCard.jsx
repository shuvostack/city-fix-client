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
    _id, 
    title, 
    description, 
    category, 
    status, 
    priority, 
    location, 
    upvotes, 
    image, 
    date,
    reporterEmail, 
    upvotedBy = [] 
  } = issue || {};
  
  const [voteCount, setVoteCount] = useState(upvotes);
  const [isVoted, setIsVoted] = useState(user?.email && upvotedBy.includes(user.email));

  // Status Color Logic 
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

    if (user.email === reporterEmail) {
        return toast.error("You cannot vote on your own issue!");
    }

    if (isVoted) {
        return toast.error("You have already voted!");
    }

    try {
        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/issues/upvote/${_id}`, 
            {}, 
            { headers: { Authorization: `Bearer ${localStorage.getItem('cityfix-token')}` } }
        );

        if (data.modifiedCount > 0) {
            setVoteCount(prev => prev + 1);
            setIsVoted(true);
            toast.success("Vote added successfully!");
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to upvote");
    }
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

        {/* Priority Badge */}
        {priority === 'High' && (
           <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold shadow-sm border border-red-400/50">
             <Activity size={12} /> HIGH PRIORITY
           </div>
        )}

        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Meta Info Row */}
        <div className="flex items-center justify-between text-gray-500 text-xs mb-3 font-medium">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
             <Calendar size={13} />
             <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md max-w-[50%]">
             <MapPin size={13} className="text-primary" />
             <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Category Tag */}
        <div className="mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                <Tag size={10} />
                {category}
            </span>
        </div>

        {/* Footer / Actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          
          {/* Vote Btn */}
          <button 
            onClick={handleUpvote}
            disabled={isVoted || user?.email === reporterEmail}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
                ${isVoted 
                    ? 'bg-primary/10 text-primary cursor-default' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-primary active:scale-95'
                }
            `}
          >
            <ThumbsUp size={16} className={isVoted ? "fill-current" : ""} />
            <span>{voteCount} Votes</span>
          </button>

          {/* Details Button */}
          <Link 
            to={`/details/${_id}`} 
            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group/btn"
          >
            Details
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;