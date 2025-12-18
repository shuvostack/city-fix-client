import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: summary = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: allIssues = [], isLoading: issuesLoading } = useQuery({
    queryKey: ["all-issues-chart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues?limit=1000"); // Fetch enough for stats
      return res.data.issues;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["latest-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.slice(0, 5).reverse(); // Mocking latest by reversing
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["latest-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data.slice(0, 5);
    },
  });

  // Calculation
  const pendingCount = allIssues.filter((i) => i.status === "pending").length;
  const resolvedCount = allIssues.filter((i) => i.status === "resolved").length;
  const progressCount = allIssues.filter(
    (i) => i.status === "in-progress"
  ).length;
  
  // const rejectedCount = 0;

  // chart data
  const pieData = [
    { name: "Resolved", value: resolvedCount, color: "#10B981" }, 
    { name: "Pending", value: pendingCount, color: "#F59E0B" }, 
    { name: "In Progress", value: progressCount, color: "#3B82F6" }, 
  ];

  const barData = [
    { name: "Issues", total: allIssues.length, resolved: resolvedCount },
    {
      name: "Users",
      total: summary.totalUsers || 0,
      active: summary.totalUsers,
    }, 
  ];

  if (issuesLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans space-y-8">
      <div className="animate-fade-in-down">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Platform overview, analytics, and recent activities.
        </p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">
              ৳ {summary.totalRevenue || 0}
            </h3>
          </div>
        </div>

        {/* Total Issues */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Issues</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {summary.totalIssues || 0}
            </h3>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Resolved Issues</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {resolvedCount}
            </h3>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending Review</p>
            <h3 className="text-2xl font-bold text-gray-800">{pendingCount}</h3>
          </div>
        </div>
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up delay-100">
        {/* Issue Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity size={18} className="text-primary" /> Issue Status
            Distribution
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users size={18} className="text-primary" /> Platform Growth
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total"
                  fill="#8884d8"
                  name="Total Count"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="resolved"
                  fill="#82ca9d"
                  name="Solved"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
        {/* Latest Issues */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Latest Issues</h3>
            <button className="text-xs text-primary font-bold hover:underline flex items-center">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {allIssues.slice(0, 4).map((issue) => (
              <div
                key={issue._id}
                className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <img
                  src={issue.image}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {issue.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        issue.status === "resolved"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    ></span>
                    <p className="text-xs text-gray-500 capitalize">
                      {issue.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Payments */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Recent Transactions</h3>
          </div>
          <div className="space-y-4">
            {payments.length > 0 ? (
              payments.map((pay) => (
                <div
                  key={pay._id}
                  className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                      <DollarSign size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Payment</p>
                      <p className="text-xs text-gray-500">
                        {new Date(pay.date || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">
                    +৳{pay.amount}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No transactions yet.</p>
            )}
          </div>
        </div>

        {/* New Users */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">New Users</h3>
          </div>
          <div className="space-y-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <img
                  src={u.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-gray-800">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
