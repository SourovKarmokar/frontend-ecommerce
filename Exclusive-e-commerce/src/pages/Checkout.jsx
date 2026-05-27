import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totals = location?.state?.totalPrice || 0;
  const product = useSelector((state) => state.cartInfo.value);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [checkoutDetails, setCheckoutDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Please sign in to checkout</h2>
        <p className="text-gray-500 mb-6 text-sm">You need to be logged in to place an order.</p>
        <Link
          to="/login"
          state={{ from: "/checkout" }}
          className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!checkoutDetails.firstName || !checkoutDetails.email || !checkoutDetails.phone) {
      setError("Please fill all required fields!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/order/payment`, {
        ...checkoutDetails,
        totalPrice: totals,
        products: product,
      });
      if (response.data.success && response.data.gatewayPageURL) {
        window.location.href = response.data.gatewayPageURL;
      } else {
        setError("Payment gateway initialization failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-gray-50 focus:bg-white transition-colors";

  return (
    <div className="py-8 md:py-12 font-poppins">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Checkout</h1>
      <p className="text-sm text-gray-500 mb-8">
        <Link to="/cart" className="text-red-500 hover:underline">Cart</Link>
        {" → "}
        <span className="font-medium text-gray-700">Checkout</span>
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Billing Form */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-700 mb-5">Billing Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input name="firstName" value={checkoutDetails.firstName} onChange={handleChange} type="text" placeholder="John" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Last Name</label>
                <input name="lastName" value={checkoutDetails.lastName} onChange={handleChange} type="text" placeholder="Doe" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Email <span className="text-red-500">*</span>
              </label>
              <input name="email" value={checkoutDetails.email} onChange={handleChange} type="email" placeholder="you@example.com" className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Phone <span className="text-red-500">*</span>
              </label>
              <input name="phone" value={checkoutDetails.phone} onChange={handleChange} type="tel" placeholder="+880 1XXXXXXXXX" className={inputClass} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Street Address</label>
              <input name="address" value={checkoutDetails.address} onChange={handleChange} type="text" placeholder="House number and street name" className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">City</label>
                <input name="city" value={checkoutDetails.city} onChange={handleChange} type="text" placeholder="Dhaka" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Postcode</label>
                <input name="postcode" value={checkoutDetails.postcode} onChange={handleChange} type="text" placeholder="1200" className={inputClass} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-base mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                "Place Order & Pay"
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <h2 className="text-lg font-semibold text-gray-700 mb-5">Your Order</h2>
          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
              {product.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.cartQun}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                    ৳{(item.price * item.cartQun).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>৳{Number(totals).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t text-base">
                <span>Total</span>
                <span className="text-red-500">৳{Number(totals).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700 text-center">
                🔒 Secure payment powered by SSLCommerz
              </p>
            </div>
          </div>

          <Link to="/cart" className="block text-center text-sm text-gray-400 hover:text-red-500 transition mt-4">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
