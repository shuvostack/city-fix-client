import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEnvelope, FaLock, FaExclamationCircle } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";
import { auth } from "../../firebase/firebase.config";

const Login = () => {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setAuthError("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const jwtRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: result.user.email }
      );

      if (jwtRes.data?.token) {
        localStorage.setItem("cityfix-token", jwtRes.data.token);
      }

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in-up">
      {authError && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
          <FaExclamationCircle className="text-red-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-red-600 font-medium">{authError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="email"
              placeholder="name@example.com"
              className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none transition-all duration-300
                ${errors.email 
                  ? "border-red-400 focus:ring-2 focus:ring-red-200" 
                  : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                }
              `}
              {...register("email", { required: "Email is required" })}
            />
          </div>
        </div>

        {/* Password */}
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
              {...register("password", { required: "Password is required" })}
            />
          </div>
        </div>

        <button
          className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
        </div>
      </div>

      <GoogleLogin />

      <div className="mt-8 text-center lg:hidden">
         <p className="text-sm text-gray-600">
           New to CityFix?{" "}
           <Link to="/auth/register" className="text-primary font-bold hover:underline">
             Create an account
           </Link>
         </p>
      </div>
    </div>
  );
};

export default Login;