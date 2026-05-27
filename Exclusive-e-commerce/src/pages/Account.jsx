import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../slice/authSlice";
import { clearCart } from "../slice/cartSlice";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Account = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cartInfo.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      setLoadingOrders(true);
      axios
        .get(`${API_BASE_URL}/api/v1/order/getallorders`)
        .then(({ data }) => {
          // Filter orders belonging to this logged in user's email
          const userOrders = (data.data || []).filter(
            (order) => order.email?.toLowerCase() === user.email?.toLowerCase()
          );
          setOrders(userOrders);
        })
        .catch(() => {})
        .finally(() => setLoadingOrders(false));
    }
  }, [isLoggedIn, user?.email]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Logged In</h2>
        <p className="text-gray-500 mb-6">Please sign in to view your account</p>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="bg-red-500 text-white px-6 py-2.5 rounded-lg hover:bg-red-600 transition font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="border border-red-500 text-red-500 px-6 py-2.5 rounded-lg hover:bg-red-50 transition font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 font-poppins">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-red-500">
                  {user?.firstName?.[0]?.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-850 truncate max-w-full">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 text-sm truncate max-w-full">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-semibold uppercase tracking-wide">
                {user?.role || "user"}
              </span>
            </div>

            <div className="border-t pt-4 space-y-3.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Items in Cart</span>
                <span className="font-bold text-gray-800">{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cart Value</span>
                <span className="font-bold text-red-500">
                  ${cartItems.reduce((sum, item) => sum + item.price * item.cartQun, 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                to="/cart"
                className="w-full text-center bg-gray-50 hover:bg-gray-100 border text-gray-700 font-medium py-2.5 rounded-lg transition text-sm"
              >
                View Cart
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition text-sm shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Order History */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">My Orders</h3>

            {loadingOrders ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Fetching your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center">
                <span className="text-4xl">📦</span>
                <h4 className="font-semibold text-gray-700 mt-3 mb-1">No orders found</h4>
                <p className="text-gray-400 text-xs mb-4">You haven't placed any orders yet.</p>
                <Link
                  to="/product"
                  className="inline-block bg-secondary hover:bg-red-600 text-white text-xs font-semibold px-6 py-2.5 rounded-md transition"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-gray-500 font-semibold">
                      <th className="pb-3 pr-2">Transaction ID</th>
                      <th className="pb-3 pr-2">Date</th>
                      <th className="pb-3 pr-2">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => (
                      <tr key={order._id} className="text-gray-700">
                        <td className="py-3.5 pr-2 font-mono text-xs text-gray-500 truncate max-w-[120px]" title={order.transactionId}>
                          {order.transactionId || "N/A"}
                        </td>
                        <td className="py-3.5 pr-2 text-xs text-gray-500">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="py-3.5 pr-2 font-semibold">
                          ৳{Number(order.totalPrice || 0).toFixed(2)}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.paymentStatus?.toLowerCase() === "success"
                                ? "bg-green-50 text-green-700"
                                : order.paymentStatus?.toLowerCase() === "pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {order.paymentStatus || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
