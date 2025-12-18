import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  MapPin,
  Edit3,
  LogOut,
  CheckCircle,
  Clock,
  Phone,
  X,
  Camera,
  Save,
  Loader2,
  UploadCloud,
  Crown, 
  AlertTriangle, 
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query"; 
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user, logOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  
  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ["user-profile-data", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLogout = () => {
    logOut();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  
  const handleSubscribe = () => {
    navigate("/dashboard/payment"); 
  };

  return (
    <div className="font-sans pb-10 relative">
      <div className="relative mb-8 animate-fade-in-down">
        {/* Banner */}
        <div className="h-48 md:h-64 w-full rounded-2xl bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative shadow-md overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 text-sm font-semibold shadow-lg"
            >
              <LogOut size={16} />{" "}
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 flex flex-col md:flex-row items-start gap-6 relative">
          {/* Photo */}
          <div className="relative -mt-16 md:-mt-20 z-20">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white bg-white shadow-xl overflow-hidden">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-2 right-2 p-2 bg-gray-900 text-white rounded-full hover:bg-primary transition-colors shadow-md border-2 border-white cursor-pointer"
            >
              <Edit3 size={16} />
            </button>
          </div>

         
          <div className="pt-2 md:pt-4 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {user?.displayName}
                  {(role === "admin" || dbUser?.isVerified) && (
                    <CheckCircle
                      className="text-blue-500"
                      size={24}
                      fill="currentColor"
                      stroke="white"
                    />
                  )}
                </h1>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100 uppercase tracking-wide flex items-center gap-1">
                    <Shield size={14} /> {role || "Citizen"}
                  </span>
                  <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
                    <MapPin size={14} /> Dhaka, Bangladesh
                  </span>
                </div>
              </div>

              <div className="hidden md:block">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-primary transition-colors font-medium text-sm shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <User className="text-primary" size={20} /> Personal Information
              </h3>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Update
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <div className="text-gray-800 font-semibold text-base">
                  {user?.displayName}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="text-gray-800 font-semibold text-base flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" /> {user?.email}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Phone Number
                </label>
                <div className="text-gray-800 font-semibold text-base flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />{" "}
                  {user?.phoneNumber || "Not Set"}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  User ID
                </label>
                <div className="text-gray-500 font-mono text-xs bg-gray-50 p-2 rounded border border-gray-200 inline-block">
                  {user?.uid?.slice(0, 15)}...
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="text-primary" size={20} /> Account Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Joined On
                  </p>
                  <p className="font-bold text-gray-800">
                    {formatDate(user?.metadata?.creationTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Last Login
                  </p>
                  <p className="font-bold text-gray-800">
                    {formatDate(user?.metadata?.lastSignInTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-1 space-y-6">
          {dbUser?.isVerified ? (
            // premium
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-3 border border-white/20 shadow-inner">
                  <Shield size={28} className="text-green-400" />
                </div>
                <h3 className="text-lg font-bold mb-1">Verified Account</h3>
                <p className="text-gray-400 text-xs mb-4">
                  Your identity has been verified. You can access all premium
                  features.
                </p>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full w-full"></div>
                </div>
                <p className="text-[10px] text-green-400 mt-2 font-bold tracking-wider">
                  STATUS: PREMIUM ACTIVE
                </p>
              </div>
            </div>
          ) : (
            // Free
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-3 border border-white/20 shadow-inner animate-pulse">
                  <Crown size={28} className="text-yellow-300" />
                </div>
                <h3 className="text-lg font-bold mb-1">Upgrade to Premium</h3>
                <p className="text-white/80 text-xs mb-4">
                  Report unlimited issues and get verified badge. One-time fee.
                </p>

                <button
                  onClick={handleSubscribe}
                  className="w-full py-2.5 bg-white text-orange-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-colors text-sm"
                >
                  Subscribe Now
                </button>

                <p className="text-[10px] text-white/70 mt-3 font-medium">
                  Fee: ৳1000 / Lifetime
                </p>
              </div>
            </div>
          )}


          {dbUser?.isBlocked && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle
                className="text-red-500 shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <h4 className="text-sm font-bold text-red-700">
                  Account Restricted
                </h4>
                <p className="text-xs text-red-600 mt-1 leading-relaxed">
                  Your account has been blocked by the admin. You cannot submit
                  or edit issues. Please contact support.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      
      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          closeModal={() => setIsEditModalOpen(false)}
          axiosSecure={axiosSecure}
          refetch={refetch} 
        />
      )}
    </div>
  );
};


const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditProfileModal = ({ user, closeModal, axiosSecure, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.displayName || "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoURL = user?.photoURL;
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await axios.post(image_hosting_api, formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        if (res.data.success) photoURL = res.data.data.display_url;
      }

      await updateProfile(user, { displayName: data.name, photoURL: photoURL });
      const dbRes = await axiosSecure.patch(`/users/${user.email}`, {
        name: data.name,
        photo: photoURL,
      });

      if (dbRes.data.acknowledged) {
        Swal.fire({
          title: "Profile Updated!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        if (refetch) refetch();
        closeModal();
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-zoom-in overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Edit3 size={18} className="text-primary" /> Edit Profile
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <User size={12} /> Full Name
            </label>
            <input
              {...register("name", { required: true })}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <UploadCloud size={12} /> Upload New Photo
            </label>
            <input
              type="file"
              {...register("image")}
              className="w-full p-2 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={18} />
            )}{" "}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
