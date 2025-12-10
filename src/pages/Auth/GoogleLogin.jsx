import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import auth from "../../firebase/firebase.config";
import axios from "axios";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);

      // backend user save/update
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        role: "citizen",
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userData
      );

      if (res.data?.token) {
        localStorage.setItem("cityfix-token", res.data.token);
      }

      navigate("/dashboard/home");
    } catch (error) {
      console.error(error);
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
