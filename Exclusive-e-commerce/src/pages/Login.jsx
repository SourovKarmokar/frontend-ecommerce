import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../slice/authSlice";
import API_BASE_URL from "../config/api";
import loginHero from "../assets/login_signup_hero.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from || "/";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/authentication/login`, formData);
      if (res.data.success && res.data.accessToken) {
        dispatch(loginUser({ user: res.data.user, token: res.data.accessToken }));
        navigate(from, { replace: true });
      } else {
        setError(res.data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-poppins">
      {/* Left decorative panel - Matches Figma mockup design */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#CBE4E8] items-center justify-center p-6 relative overflow-hidden">
        <div className="w-full h-full max-h-[85%] flex items-center justify-center">
          <img
            src={loginHero}
            alt="Log in to Exclusive"
            className="w-full h-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 md:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-[36px] font-medium text-black mb-2 font-inter tracking-normal">Log in to Exclusive</h1>
          <p className="text-black/80 mb-10 text-sm md:text-base">Enter your details below</p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or Phone Number"
              required
              className="w-full border-b border-black/30 focus:border-secondary outline-none py-2.5 text-sm md:text-base transition-colors bg-transparent placeholder-black/40 font-poppins"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full border-b border-black/30 focus:border-secondary outline-none py-2.5 text-sm md:text-base transition-colors bg-transparent placeholder-black/40 font-poppins"
            />

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary hover:bg-red-600 text-white font-medium py-3 px-12 rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-base font-poppins"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <button
                type="button"
                className="text-secondary hover:text-red-600 transition text-sm md:text-base font-medium font-poppins"
              >
                Forget Password?
              </button>
            </div>
          </form>

          <p className="text-center text-sm md:text-base text-black/60 mt-10">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-semibold hover:text-secondary underline underline-offset-4 ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
