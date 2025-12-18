import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { MapPin, ThumbsUp, Calendar, ArrowRight, Activity } from 'lucide-react';
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

  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'bg-green-100 text-green-600 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-600 border-orange-200';
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
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      <div className="relative h-52 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

        {priority === 'High' && (
           <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold shadow-lg animate-pulse border border-red-400">
             <Activity size={12} /> High Priority
           </div>
        )}

        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md ${getStatusColor(status)}`}>
          {status}
        </div>
        
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium rounded-lg">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          <div className="flex items-center gap-1">
             <Calendar size={12} />
             <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 font-medium truncate max-w-[120px]">
             <MapPin size={12} className="text-primary" />
             <span className="truncate">{location}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mb-5 line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="border-t border-gray-100 mb-4"></div>

        <div className="flex items-center justify-between mt-auto">
          
          {/* Upvote */}
          <button 
            onClick={handleUpvote}
            disabled={isVoted || user?.email === reporterEmail}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300
                ${isVoted 
                    ? 'bg-primary/10 text-primary border-primary/20 cursor-default' 
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-primary hover:text-white hover:border-primary'
                }
            `}
          >
            <ThumbsUp size={16} className={isVoted ? "fill-current" : ""} />
            <span className="font-bold text-sm">{voteCount}</span>
          </button>

          {/* View Details */}
          <Link 
            to={`/details/${_id}`} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-primary transition-colors duration-300 shadow-md group-hover:shadow-lg"
          >
            Details
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;