import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { CheckCircle, ArrowRight } from 'lucide-react';
import IssueCard from '../../components/cards/IssueCard';
import Loader from '../../components/shared/Loader/Loader';

const LatestResolvedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/issues?status=resolved&limit=6`);
        setIssues(data.issues || []); 
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="py-20 bg-gray-50 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <CheckCircle size={20} />
              <span className="uppercase tracking-wider text-sm">Community Successes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Latest <span className="text-primary">Resolved</span> Issues
            </h2>
            <p className="text-gray-500 mt-3 text-lg">
              Witness the change. Here are the most recent infrastructure problems fixed by our team.
            </p>
          </div>

          {/* View All Button */}
          <Link 
            to="/all-issues" 
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 border border-gray-200 rounded-xl font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
          >
            View All Issues <ArrowRight size={18} />
          </Link>
        </div>

        {issues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-600">No Resolved Issues Yet</h3>
            <p className="text-gray-400 mt-2 text-center max-w-md">
              Our team is working hard! Once issues are fixed, they will appear here. Be the first to report one.
            </p>
            <Link to="/dashboard/add-issue" className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
              Report an Issue
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default LatestResolvedIssues;
