import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Auth/GoogleLogin";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/dashboard/home";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Firebase login
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Backend JWT
      const jwtRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: result.user.email }
      );

      if (jwtRes.data?.token) {
        localStorage.setItem("cityfix-token", jwtRes.data.token);
      }

      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-lg border border-base-300">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Login to CityFix
        </h1>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-error text-sm">{error}</p>}

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <GoogleLogin />

        <p className="text-center mt-4 text-sm">
          New to CityFix?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
