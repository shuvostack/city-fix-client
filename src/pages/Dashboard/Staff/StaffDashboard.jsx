import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  PieChart as PieIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";

const StaffDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["staff-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/assigned/${user.email}`);
      return res.data;
    },
  });

  // calculation
  const totalAssigned = issues.length;
  const resolvedCount = issues.filter(
    (i) => i.status === "resolved" || i.status === "closed"
  ).length;
  const pendingCount = issues.filter((i) => i.status === "pending").length;
  const workingCount = issues.filter(
    (i) => i.status === "in-progress" || i.status === "working"
  ).length;

  const highPriorityTasks = issues.filter(
    (i) =>
      i.priority === "High" && i.status !== "resolved" && i.status !== "closed"
  );

  // Chart Data
  const pieData = [
    { name: "Resolved", value: resolvedCount, color: "#10B981" },
    { name: "Working", value: workingCount, color: "#3B82F6" },
    { name: "Pending", value: pendingCount, color: "#F59E0B" },
  ];

  const barData = [
    { name: "Total", value: totalAssigned },
    { name: "Solved", value: resolvedCount },
    { name: "Pending", value: pendingCount },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans space-y-8">
      <div className="animate-fade-in-down">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello, {user?.displayName?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here is your daily activity overview.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
        {/* Assigned */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <ClipboardList size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Assigned Tasks</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {totalAssigned}
            </h3>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <h3 className="text-3xl font-bold text-gray-800">
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
            <p className="text-gray-500 text-sm font-medium">Pending</p>
            <h3 className="text-3xl font-bold text-gray-800">{pendingCount}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
        {/* --- CHARTS --- */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <PieIcon size={18} className="text-primary" /> Task Progress
            Analytics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "#6366f1"
                          : index === 1
                          ? "#10b981"
                          : "#f59e0b"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="lg:col-span-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>

          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 z-10">
            <AlertTriangle className="text-red-400" size={20} /> High Priority
            Tasks
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 z-10 pr-2 custom-scrollbar">
            {highPriorityTasks.length > 0 ? (
              highPriorityTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/5 hover:bg-white/20 transition-colors"
                >
                  <p className="text-sm font-bold line-clamp-1">{task.title}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />{" "}
                      {new Date(task.date).toLocaleDateString()}
                    </span>
                    <span className="uppercase font-bold tracking-wider text-orange-300">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                <CheckCircle size={40} className="mb-2 opacity-50" />
                <p>
                  No high priority tasks pending. <br /> Great job!
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-center z-10">
            <p className="text-xs text-gray-400">
              Check "Assigned Tasks" for full list
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
