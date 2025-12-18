import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  CheckCircle,
  Clock,
  Plus,
  Activity,
  ArrowRight,
  BarChart2, 
} from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Loader from "../../../components/shared/Loader/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0,
  });

  useEffect(() => {
    const fetchMyStats = async () => {
      if (!user?.email) return;

      try {
        const { data } = await axiosSecure.get(
          `/issues/my-issues/${user.email}`
        );

        setIssues(data);

        // Stats calculation
        const total = data.length;
        const resolved = data.filter((i) => i.status === "resolved").length;
        const pending = data.filter((i) => i.status === "pending").length;
        const inProgress = data.filter(
          (i) => i.status === "in-progress"
        ).length;

        setStats({ total, resolved, pending, inProgress });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStats();
  }, [user, axiosSecure]);

  // Chart Data
  const chartData = [
    { name: "Pending", value: stats.pending, color: "#F97316" }, 
    { name: "In Progress", value: stats.inProgress, color: "#8B5CF6" }, 
    { name: "Resolved", value: stats.resolved, color: "#2563EB" }, 
  ];

  
  const activeChartData = chartData;

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-primary">
              {user?.displayName?.split(" ")[0]}!
            </span>{" "}
            👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here is what’s happening with your reports today.
          </p>
        </div>
        <Link
          to="/dashboard/add-issue"
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-primary transition-all shadow-lg hover:shadow-primary/30 active:scale-95"
        >
          <Plus size={20} /> Report New Issue
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
        {/* Total Reports */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <FileText size={20} />
            </div>
            <p className="text-gray-500 text-sm font-medium">Total Reports</p>
            <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
              <Clock size={20} />
            </div>
            <p className="text-gray-500 text-sm font-medium">Pending Review</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {stats.pending}
            </h3>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Activity size={20} />
            </div>
            <p className="text-gray-500 text-sm font-medium">In Progress</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {stats.inProgress}
            </h3>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-gradient-to-br from-primary to-blue-600 p-6 rounded-2xl shadow-lg shadow-primary/30 relative overflow-hidden text-white group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mb-4">
              <CheckCircle size={20} />
            </div>
            <p className="text-blue-100 text-sm font-medium">Solved Issues</p>
            <h3 className="text-3xl font-bold">{stats.resolved}</h3>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
        {/* Left */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <Link
              to="/dashboard/my-issues"
              className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {issues.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-100 text-gray-500 text-sm">
                    <th className="pb-4 font-medium pl-2">Issue Title</th>
                    <th className="pb-4 font-medium">Category</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {issues.slice(0, 5).map((issue) => (
                    <tr
                      key={issue._id}
                      className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <td className="py-4 pl-2 font-medium text-gray-800">
                        <div className="flex items-center gap-3">
                          <img
                            src={issue.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="truncate max-w-[150px]">
                            {issue.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500">{issue.category}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                        ${
                          issue.status === "resolved"
                            ? "bg-green-100 text-green-600"
                            : issue.status === "in-progress"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-600"
                        }
                      `}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <Link
                          to={`/details/${issue._id}`}
                          className="text-gray-400 hover:text-primary font-medium transition-colors"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <FileText className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-700">
                No reports found
              </h3>
              <p className="text-gray-400 max-w-sm mt-1 mb-6">
                You haven't reported any issues yet.
              </p>
              <Link
                to="/dashboard/add-issue"
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-primary transition-colors text-sm font-medium"
              >
                Start Reporting
              </Link>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
          </div>

          <div style={{ width: "100%", height: 300, minHeight: 300 }}>
            {stats.total > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activeChartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    dy={10} 
                  />
                  <YAxis
                    hide={true} 
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                    {activeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <BarChart2 size={48} className="text-gray-200 mb-3" />
                <p>Not enough data to display chart.</p>
                <p className="text-xs text-gray-300 mt-1">
                  Start by adding an issue
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
