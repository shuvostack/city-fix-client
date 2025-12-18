import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Camera,
  MapPin,
  Type,
  AlignLeft,
  List,
  Send,
  X,
  ImagePlus,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2"; 
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ReportIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: userData = {} } = useQuery({
    queryKey: ["user-check-limit", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: issueCount = 0 } = useQuery({
    queryKey: ["issue-count-check", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/count/${user.email}`);
      return res.data.count;
    },
    enabled: !!user?.email,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    reset({ photo: null });
  };

  const onSubmit = async (data) => {
    if (userData.isBlocked) {
      Swal.fire({
        icon: "error",
        title: "Account Restricted",
        text: "You are blocked from reporting issues. Please contact admin.",
      });
      return;
    }

    if (!userData.isVerified && issueCount >= 3) {
      Swal.fire({
        icon: "warning",
        title: "Free Limit Reached",
        text: "You have reported 3 issues. Upgrade to Premium for unlimited reports!",
        confirmButtonText: "Upgrade Now",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/payment");
        }
      });
      return;
    }

    setLoading(true);
    try {
      const imageFile = { image: data.photo[0] };
      const uploadRes = await axios.post(image_upload_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const photoURL = uploadRes.data.data.display_url;

      const issueData = {
        title: data.title,
        description: data.description,
        location: data.location,
        category: data.category,
        image: photoURL,
        reporterName: user?.displayName,
        reporterEmail: user?.email,
        reporterPhoto: user?.photoURL,
        status: "pending",
        priority: "Normal",
        upvotes: 0,
        upvotedBy: [],
        date: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/issues", issueData);

      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Report Submitted!",
          text: "Thank you for reporting. We will review it shortly.",
          showConfirmButton: false,
          timer: 2000,
        });

        reset();
        setImagePreview(null);
        navigate("/dashboard/my-issues");
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong! Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 animate-fade-in-down">
        <h1 className="text-3xl font-bold text-gray-800">Report an Issue</h1>
        <p className="text-gray-500 mt-2">
          Help us maintain the city by reporting infrastructure problems.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left*/}
        <div className="lg:col-span-1 animate-fade-in-up">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Evidence Photo
            </label>

            <div
              className={`relative w-full h-80 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
              ${
                errors.photo
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-primary"
              }
            `}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <ImagePlus size={48} className="text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG (Max 5MB)
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...register("photo", {
                      required: "Image is required",
                      onChange: handleImageChange,
                    })}
                  />
                </>
              )}
            </div>
            {errors.photo && (
              <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                <X size={12} /> {errors.photo.message}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 animate-fade-in-up delay-100">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Issue Title
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Type size={18} />
                </div>
                <input
                  type="text"
                  placeholder="E.g., Broken Street Light"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  {...register("title", { required: "Title is required" })}
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <List size={18} />
                  </div>
                  <select
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Select Category</option>
                    <option value="Roads">Roads & Transport</option>
                    <option value="Lighting">Street Lighting</option>
                    <option value="Water">Water Supply</option>
                    <option value="Waste">Waste Management</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Safety">Public Safety</option>
                  </select>
                </div>
                {errors.category && (
                  <p className="text-red-500 text-xs ml-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="E.g., Dhanmondi 27, Dhaka"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-xs ml-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Description
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-gray-400">
                  <AlignLeft size={18} />
                </div>
                <textarea
                  rows="5"
                  placeholder="Describe the issue in detail..."
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs ml-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                disabled={loading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Report <Send size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;
