import API_BASE_URL from '../../config/api';
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOtp = () => {
  const nevigate = useNavigate()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailFromUrl = searchParams.get('email') || '';
  
  const [email, setEmail] = useState(emailFromUrl);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/authentication/varifybyotp`,
        { email, otp }
      );
      
      if(res.data.message === "OTP Verify Successfully"){
        setTimeout(() => {
            nevigate("/login")
            
        }, 2000);
      }
      

      console.log(res);
      setSuccess(res.data.message || 'Verification successful!');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Verification error:', err);
      
      if (err.response) {
        // Server responded with error
        setError(err.response.data.message || 'Verification failed. Please try again.');
      } else if (err.request) {
        // Request made but no response
        setError('No response from server. Please check your connection.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/authentication/resendotp`,
        { email }
      );
      console.log(res);
      
      setSuccess('OTP resent successfully! Check your email.');
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter the email you registered with and the OTP sent to your inbox.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{success}</p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <div className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200"
                placeholder="example@gmail.com"
              />
            </div>

            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                One Time Password (OTP)
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 tracking-widest text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="X X X X X X"
                maxLength={6}
              />
            </div>
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white ${
                loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
          
          {/* Resend Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline disabled:text-blue-300 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
