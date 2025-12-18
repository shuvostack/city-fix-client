import React, { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const StaffInfo = ({ staffEmail }) => {
  const [staff, setStaff] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStaff = async () => {
      if (!staffEmail) return;
      try {
        const res = await axiosSecure.get(`/users/${staffEmail}`);
        setStaff(res.data);
      } catch (error) {
        console.log(error)
        console.error("Failed to load staff info");
      }
    };
    fetchStaff();
  }, [staffEmail, axiosSecure]);

  if (!staffEmail) {
    return (
      <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-300 text-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-3">
          <UserCheck className="text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">No staff assigned yet.</p>
        <p className="text-xs text-gray-400">Waiting for admin approval.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <UserCheck size={18} className="text-primary" /> Assigned Staff
      </h3>

      <div className="flex items-center gap-4">
        <img
          src={staff?.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="Staff"
          className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-800">
            {staff?.name || "Staff Member"}
          </h4>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded uppercase">
            Official Staff
          </span>
        </div>
      </div>
    </div>
  );
};

export default StaffInfo;
