import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaExclamationCircle } from "react-icons/fa";
import { auth } from "../../firebase/firebase.config";
import GoogleLogin from "./GoogleLogin";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [regError, setRegError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard/home";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setRegError("");
    setImageLoading(true);

    try {
      const imageFile = { image: data.photo[0] };
      const uploadRes = await axios.post(image_upload_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const photoURL = uploadRes.data.data.display_url;

      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: photoURL,
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "citizen",
        isPremium: false,
        isBlocked: false,
      });

      const jwtRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: data.email }
      );

      if (jwtRes.data?.token) {
        localStorage.setItem("cityfix-token", jwtRes.data.token);
      }

      reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setRegError("Registration failed! Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in-up">

      {regError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
          <FaExclamationCircle className="text-red-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-red-600 font-medium">{regError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* NAME */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Full Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaUser className="text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all duration-300
                ${errors.name 
                  ? "border-red-400 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                }
              `}
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* PHOTO */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Profile Photo</label>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
               <FaCamera className="text-gray-400 group-focus-within:text-primary transition-colors" />
             </div>
             <input
              type="file"
              accept="image/*"
              className={`w-full pl-11 py-3 bg-gray-50 border rounded-xl outline-none transition-all duration-300 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20
                ${errors.photo 
                  ? "border-red-400 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                }
              `}
              {...register("photo", { required: "Photo is required" })}
            />
          </div>
          {errors.photo && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.photo.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all duration-300
                ${errors.email 
                  ? "border-red-400 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                }
              `}
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaLock className="text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all duration-300
                ${errors.password 
                  ? "border-red-400 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                }
              `}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex justify-center items-center"
          disabled={isSubmitting || imageLoading}
        >
          {isSubmitting || imageLoading ? (
            <span className="flex items-center gap-2">
               <span className="loading loading-spinner loading-sm"></span> Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* DIVIDER */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">Or register with</span>
        </div>
      </div>

      {/* GOOGLE LOGIN */}
      <div>
        <GoogleLogin />
      </div>

      <div className="mt-8 text-center lg:hidden">
         <p className="text-sm text-gray-600">
           Already have an account?{" "}
           <Link to="/auth/login" className="text-primary font-bold hover:underline">
             Log in
           </Link>
         </p>
      </div>

    </div>
  );
};

export default Register;