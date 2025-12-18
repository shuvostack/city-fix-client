import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2"; 

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: "citizen",
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);

      const jwtRes = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result.user.email,
      });

      if (jwtRes.data?.token) {
        localStorage.setItem("cityfix-token", jwtRes.data.token);
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${result.user.displayName}!`,
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong with Google Login!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline w-full mt-3 hover:border-primary hover:text-primary"
      disabled={loading}
    >
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        "Continue with Google"
      )}
    </button>
  );
};

export default GoogleLogin;
