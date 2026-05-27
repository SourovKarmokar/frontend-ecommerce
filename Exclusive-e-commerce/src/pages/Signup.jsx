import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import loginHero from "../assets/login_signup_hero.png";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);

    // Split single Name input into firstName and lastName for backend compatibility
    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || "Name";

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/authentication/registration`, {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        role: "user",
      });
      if (res.data.success) {
        navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        setError(res.data.message || "Registration failed.");
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
            alt="Create an account"
            className="w-full h-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 md:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-[36px] font-medium text-black mb-2 font-inter tracking-normal">Create an account</h1>
          <p className="text-black/80 mb-10 text-sm md:text-base">Enter your details below</p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full border-b border-black/30 focus:border-secondary outline-none py-2.5 text-sm md:text-base transition-colors bg-transparent placeholder-black/40 font-poppins"
            />
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-red-600 text-white font-medium py-3.5 rounded transition disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-sm text-sm md:text-base font-poppins"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {/* Google Signup Button exactly like the screenshot */}
            <button
              type="button"
              className="w-full border border-black/30 hover:bg-gray-50 text-black py-3.5 rounded flex items-center justify-center gap-3 transition font-medium text-sm md:text-base mt-3 font-poppins"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.56h3.29c1.92,-1.78 3.03,-4.4 3.03,-7.4C21.65,11.97 21.54,11.5 21.35,11.1z" fill="#4285F4" />
                  <path d="M12,20.5c2.3,0 4.22,-0.76 5.63,-2.06l-3.29,-2.56c-0.9,0.6 -2.07,0.96 -3.29,0.96c-2.53,0 -4.68,-1.71 -5.44,-4.02H2.21v2.64C3.62,17.47 7.54,20.5 12,20.5z" fill="#34A853" />
                  <path d="M6.56,12.82c-0.2,-0.6 -0.31,-1.24 -0.31,-1.9s0.11,-1.3 0.31,-1.9V6.38H2.21c-0.78,1.56 -1.21,3.31 -1.21,5.16s0.43,3.6 1.21,5.16L6.56,12.82z" fill="#FBBC05" />
                  <path d="M12,5.66c1.25,0 2.37,0.43 3.25,1.27l2.44,-2.44C16.22,3.15 14.3,2.5 12,2.5C7.54,2.5 3.62,5.53 2.21,9.02l4.35,3.38C7.32,10.07 9.47,5.66 12,5.66z" fill="#EA4335" />
                </g>
              </svg>
              Sign up with Google
            </button>
          </form>

          <p className="text-center text-sm md:text-base text-black/60 mt-10 font-poppins">
            Already have account?{" "}
            <Link to="/login" className="text-black font-semibold hover:text-secondary underline underline-offset-4 ml-1">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
