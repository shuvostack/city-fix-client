import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  CreditCard,
  Search,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Copy,
  Check,
  FileText, 
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import { PDFDownloadLink } from "@react-pdf/renderer"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";
import InvoiceDocument from "../../../components/InvoiceDocument/InvoiceDocument";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const chartData = useMemo(() => {
    const monthMap = {};

    payments.forEach((payment) => {
      const date = new Date(payment.date);
      const month = date.toLocaleString("default", { month: "short" });

      if (monthMap[month]) {
        monthMap[month] += payment.amount;
      } else {
        monthMap[month] = payment.amount;
      }
    });

    return Object.keys(monthMap).map((key) => ({
      name: key,
      amount: monthMap[key],
    }));
  }, [payments]);

  // Filter
  const filteredPayments = payments.filter((item) => {
    const matchesSearch =
      item.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" ? true : item.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalRevenue = payments.reduce((sum, item) => sum + item.amount, 0);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("Transaction ID Copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-down">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="text-primary" /> Payment History
          </h1>
          <p className="text-gray-500 mt-2">
            Track all financial transactions, subscriptions, and issue boosts.
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                <DollarSign size={24} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +12%
              </span>
            </div>
            <p className="text-gray-400 text-sm font-medium">Total Earnings</p>
            <h2 className="text-4xl font-bold mt-1">
              ৳ {totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Transaction Count */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <ArrowUpRight size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            Total Transactions
          </p>
          <h2 className="text-4xl font-bold mt-1 text-gray-800">
            {payments.length}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Revenue Overview
          </h3>
          <select className="text-sm bg-gray-50 border-none rounded-lg px-3 py-1 font-medium text-gray-600 focus:ring-0 cursor-pointer">
            <option>Last 12 Months</option>
            <option>Last 6 Months</option>
          </select>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#1F2937", fontWeight: "bold" }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up delay-100">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="flex p-1 bg-white border border-gray-200 rounded-xl">
            {["all", "subscription", "boost"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 text-sm font-bold rounded-lg capitalize transition-all
                          ${
                            filterType === type
                              ? "bg-gray-900 text-white shadow-md"
                              : "text-gray-500 hover:text-gray-900"
                          }
                       `}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search email or Trans ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-all"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">User Email</th>
                <th className="p-5">Transaction ID</th>
                <th className="p-5">Type</th>
                <th className="p-5">Date</th>
                <th className="p-5 text-right">Amount</th>
                <th className="p-5 text-center">Invoice</th>{" "}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((pay) => (
                <tr
                  key={pay._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  {/* Email */}
                  <td className="p-5 font-bold text-gray-800 text-sm">
                    {pay.userEmail}
                  </td>

                  {/* Transaction ID */}
                  <td className="p-5">
                    <div
                      className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-md w-fit cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => handleCopy(pay.transactionId)}
                      title="Click to Copy"
                    >
                      {pay.transactionId.slice(0, 10)}...
                      {copiedId === pay.transactionId ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </div>
                  </td>

                  {/* Type Badge */}
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border
                               ${
                                 pay.type === "subscription"
                                   ? "bg-purple-50 text-purple-600 border-purple-100"
                                   : "bg-orange-50 text-orange-600 border-orange-100"
                               }
                            `}
                    >
                      {pay.type === "subscription"
                        ? "👑 Membership"
                        : "🚀 Issue Boost"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-5">
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <Calendar size={12} />
                      {new Date(pay.date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-5 text-right font-bold text-gray-800">
                    +৳{pay.amount}
                  </td>

                  {/* Download Invoice */}
                  <td className="p-5 text-center">
                    <PDFDownloadLink
                      document={<InvoiceDocument payment={pay} />}
                      fileName={`invoice_${pay.transactionId}.pdf`}
                    >
                      {({ loading }) => (
                        <button
                          className={`p-2 rounded-full transition-colors ${
                            loading
                              ? "text-gray-300 cursor-wait"
                              : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                          }`}
                          title="Download Invoice"
                        >
                          {loading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <FileText size={18} />
                          )}
                        </button>
                      )}
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="p-10 text-center text-gray-400 text-sm">
            No payment records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
