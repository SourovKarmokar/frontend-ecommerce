import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../slice/cartSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart after successful payment
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h1>
        <p className="text-gray-500 mb-2">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          You will receive a confirmation email shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account"
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-lg transition"
          >
            My Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
