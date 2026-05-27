import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/authentication/varifybyotp`, { email, otp });
      if (res.data.message) {
        setSuccess("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.error || "OTP verification failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      await axios.post(`${API_BASE_URL}/api/v1/authentication/resendotp`, { email });
      setSuccess("New OTP sent to your email!");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📧</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="text-gray-500 text-sm mt-2">
            We sent a 5-digit code to
          </p>
          <p className="font-semibold text-gray-800 text-sm">{email}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Enter verification code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="• • • • •"
              maxLength={5}
              required
              className="w-full border-2 border-gray-200 focus:border-red-500 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] font-bold outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || otp.length < 5}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="text-center mt-5 space-y-2">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-red-500 font-semibold hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend"}
            </button>
          </p>
          <Link to="/login" className="block text-sm text-gray-400 hover:text-red-500 transition">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
