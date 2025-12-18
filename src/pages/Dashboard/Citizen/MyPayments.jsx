import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth"; // Assuming you have auth hook
import Loader from "../../../components/shared/Loader/Loader";
import { Calendar, FileText, Check, CreditCard } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "../../../components/InvoiceDocument/InvoiceDocument";

const MyPayments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CreditCard className="text-primary" /> My Payment History
        </h1>
        <p className="text-gray-500 text-sm">
          Download invoices for your subscriptions and boosts.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold">
                <tr>
                  <th className="p-4">Service Type</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((pay) => (
                  <tr key={pay._id} className="hover:bg-gray-50/50 transition">
                    {/* Type */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          pay.type === "subscription"
                            ? "bg-purple-50 text-purple-600 border-purple-100"
                            : "bg-orange-50 text-orange-600 border-orange-100"
                        }`}
                      >
                        {pay.type === "subscription" ? "Membership" : "Boost"}
                      </span>
                    </td>

                    {/* Transaction ID */}
                    <td className="p-4 text-sm font-mono text-gray-600">
                      {pay.transactionId}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(pay.date).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4 text-right font-bold text-gray-800">
                      ৳{pay.amount}
                    </td>

                    <td className="p-4 text-center">
                      <PDFDownloadLink
                        document={<InvoiceDocument payment={pay} />}
                        fileName={`invoice_${pay.transactionId}.pdf`}
                      >
                        {({ loading }) => (
                          <button
                            disabled={loading}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
                            title="Download Receipt"
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
        ) : (
          <div className="p-10 text-center text-gray-400">
            You haven't made any payments yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPayments;
