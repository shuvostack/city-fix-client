import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueCard from '../../components/cards/IssueCard';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Loader from '../../components/shared/Loader/Loader';

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  
  // Pagination 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchAllIssues = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
           search,
           status,
           category,
           priority, 
           page,
           limit
        }).toString();

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/issues?${query}`);
        
        setIssues(data.issues || []);
        const totalCount = data.total || 0;
        setTotalPages(Math.ceil(totalCount / limit));

      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
        fetchAllIssues();
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [search, status, category, priority, page]); 

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setCategory('');
    setPriority('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-10 animate-fade-in-down">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reported Issues</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse through all reported issues in your city. Help us identify and resolve problems by keeping track of the latest updates.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-10 sticky top-20 z-30 transition-all duration-300">
            
            {/* Search */}
            <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search issues (e.g. 'Pothole', 'Water')..." 
                    value={search}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                
                {/* Priority */}
                <div className="relative min-w-[150px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                        value={priority}
                        onChange={handlePriorityChange}
                        className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary cursor-pointer text-gray-600 appearance-none hover:bg-gray-100 transition-colors"
                    >
                        <option value="">Priority</option>
                        <option value="High">High</option>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* Status */}
                <div className="relative min-w-[150px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                        value={status}
                        onChange={handleStatusChange}
                        className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary cursor-pointer text-gray-600 appearance-none hover:bg-gray-100 transition-colors"
                    >
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                {/* Category */}
                <div className="relative min-w-[150px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary cursor-pointer text-gray-600 appearance-none hover:bg-gray-100 transition-colors"
                    >
                        <option value="">Category</option>
                        <option value="Roads">Roads</option>
                        <option value="Lighting">Lighting</option>
                        <option value="Water">Water</option>
                        <option value="Waste">Waste</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Safety">Safety</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Environment">Environment</option>
                    </select>
                </div>
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-20">
                <Loader />
            </div>
        ) : issues.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
                    {issues.map((issue) => (
                        <IssueCard key={issue._id} issue={issue} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-16 gap-4">
                    <button 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="p-3 rounded-xl border border-gray-200 hover:bg-white hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    <span className="font-semibold text-gray-600">
                        Page {page} of {totalPages}
                    </span>

                    <button 
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="p-3 rounded-xl border border-gray-200 hover:bg-white hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </>
        ) : (
            /* No Data Found */
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="text-gray-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No issues found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any issues matching your search filters. Try adjusting your keywords or category.
                </p>
                <button 
                    onClick={clearFilters}
                    className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                    Clear Filters
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default AllIssues;