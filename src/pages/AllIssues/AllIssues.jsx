import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueCard from '../../components/cards/IssueCard';
import { Search, Filter, ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import Loader from '../../components/shared/Loader/Loader';

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  
  // Pagination 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; 

  useEffect(() => {
    const fetchAllIssues = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
           search, status, category, priority, page, limit
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

  // Handlers
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleStatusChange = (e) => { setStatus(e.target.value); setPage(1); };
  const handleCategoryChange = (e) => { setCategory(e.target.value); setPage(1); };
  const handlePriorityChange = (e) => { setPriority(e.target.value); setPage(1); };

  const clearFilters = () => {
    setSearch(''); setStatus(''); setCategory(''); setPriority(''); setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 pt-24 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-xs font-bold uppercase tracking-wider">
            Explore & Resolve
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Reported <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Issues</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Browse through community reports. Use the filters below to find specific issues in your neighborhood and track their resolution status.
          </p>
        </div>

        {/* Floating Glassmorphism Filter Bar */}
        <div className="sticky top-24 z-30 mb-10 mx-auto max-w-7xl">
            <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 flex flex-col xl:flex-row gap-4 transition-all duration-300">
                
                {/* Search Input */}
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by title (e.g. 'Broken Road')..." 
                        value={search}
                        onChange={handleSearch}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 hover:bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                    />
                </div>

                {/* Filters Group */}
                <div className="flex gap-3 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                    
                    {/* Priority Select */}
                    <div className="relative min-w-[140px]">
                        <select 
                            value={priority} onChange={handlePriorityChange}
                            className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-600 font-medium appearance-none cursor-pointer hover:border-blue-300 transition-colors"
                        >
                            <option value="">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Normal">Normal</option>
                            <option value="Low">Low</option>
                        </select>
                        <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    {/* Status Select */}
                    <div className="relative min-w-[140px]">
                        <select 
                            value={status} onChange={handleStatusChange}
                            className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-600 font-medium appearance-none cursor-pointer hover:border-blue-300 transition-colors"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    {/* Category Select */}
                    <div className="relative min-w-[160px]">
                        <select 
                            value={category} onChange={handleCategoryChange}
                            className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-600 font-medium appearance-none cursor-pointer hover:border-blue-300 transition-colors"
                        >
                            <option value="">All Categories</option>
                            <option value="Roads">Roads</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Water">Water</option>
                            <option value="Waste">Waste</option>
                            <option value="Electricity">Electricity</option>
                        </select>
                         <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    {/* Clear Button */}
                    {(search || status || category || priority) && (
                        <button 
                            onClick={clearFilters}
                            className="px-4 py-3.5 bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 rounded-xl font-bold transition-colors flex items-center gap-2"
                        >
                            <X size={18} />
                            <span className="hidden md:inline">Reset</span>
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Content Section */}
        {loading ? (
            <div className="flex justify-center items-center py-32">
                <Loader />
            </div>
        ) : issues.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
                    {issues.map((issue) => (
                        <IssueCard key={issue._id} issue={issue} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-20 gap-6">
                    <button 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm hover:shadow-md"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Previous
                    </button>
                    
                    <span className="font-bold text-gray-700 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                        Page <span className="text-blue-600">{page}</span> of {totalPages}
                    </span>

                    <button 
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm hover:shadow-md"
                    >
                        Next
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </>
        ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm mx-auto max-w-2xl">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Search className="text-blue-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No issues found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    We couldn't find any issues matching your search filters. Try using different keywords or clear the filters to see everything.
                </p>
                <button 
                    onClick={clearFilters}
                    className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 font-bold"
                >
                    Clear All Filters
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default AllIssues;