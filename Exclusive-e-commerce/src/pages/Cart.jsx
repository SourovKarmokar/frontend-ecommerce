import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantity, removeFromCart } from "../slice/cartSlice";
import { Link, useNavigate } from "react-router";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.cartInfo.value);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [discount, setDiscount] = useState(0);
  const [couponText, setCouponText] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const grandTotal = product.reduce((prev, current) => {
    return prev + current.price * current.cartQun;
  }, 0);

  const total = grandTotal - discount;

  const handleDecrement = (item) => {
    dispatch(cartQuantity({ ...item, type: "decrement" }));
  };

  const handleIncrement = (item) => {
    dispatch(cartQuantity({ ...item, type: "increment" }));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleCoupon = () => {
    if (couponText === "sourov20") {
      setDiscount(grandTotal * 0.2);
      setCouponMsg("Coupon applied! 20% off");
    } else {
      setCouponMsg("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { totalPrice: total } });
  };

  if (product.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-10">
        <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/product"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10 font-poppins px-2 sm:px-0">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

      {/* Cart Table Header - hidden on mobile */}
      <div className="hidden md:flex py-3 px-4 bg-gray-50 rounded-lg shadow-sm justify-between mb-2 font-semibold text-sm text-gray-600">
        <div className="w-[40%]">Product</div>
        <div className="w-[20%]">Price</div>
        <div className="w-[20%]">Quantity</div>
        <div className="w-[15%]">Subtotal</div>
        <div className="w-[5%]"></div>
      </div>

      {/* Cart Items */}
      <div className="space-y-3">
        {product.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-start sm:items-center py-4 px-4 bg-white shadow-sm rounded-lg gap-3 sm:gap-0 sm:justify-between"
          >
            {/* Product Info */}
            <div className="flex items-center gap-3 w-full sm:w-[40%]">
              <img
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                src={item.image}
                alt={item.name}
              />
              <div>
                <p className="font-medium text-sm text-gray-800 line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">৳{item.price} each</p>
              </div>
            </div>

            {/* Price - mobile label */}
            <div className="flex sm:block w-full sm:w-[20%] items-center gap-2">
              <span className="sm:hidden text-xs text-gray-500 w-20">Price:</span>
              <span className="font-medium text-gray-700">৳{item.price}</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2 w-full sm:w-[20%]">
              <span className="sm:hidden text-xs text-gray-500 w-20">Qty:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleDecrement(item)}
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold transition"
                >
                  −
                </button>
                <span className="px-3 py-1.5 font-semibold text-sm min-w-[2rem] text-center">
                  {item.cartQun}
                </span>
                <button
                  onClick={() => handleIncrement(item)}
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex sm:block w-full sm:w-[15%] items-center gap-2">
              <span className="sm:hidden text-xs text-gray-500 w-20">Subtotal:</span>
              <span className="font-semibold text-red-500">
                ${(item.price * item.cartQun).toFixed(2)}
              </span>
            </div>

            {/* Remove */}
            <div className="sm:w-[5%] flex justify-end">
              <button
                onClick={() => handleRemove(item)}
                className="text-gray-400 hover:text-red-500 transition p-1"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-8 flex flex-col md:flex-row gap-6 justify-between">
        {/* Coupon */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">Have a coupon?</p>
          <div className="flex gap-2">
            <input
              onChange={(e) => setCouponText(e.target.value)}
              type="text"
              placeholder="Enter coupon code"
              className="border px-3 py-2 rounded-lg text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={handleCoupon}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
            >
              Apply
            </button>
          </div>
          {couponMsg && (
            <p className={`text-xs mt-1 ${couponMsg.includes("applied") ? "text-green-600" : "text-red-500"}`}>
              {couponMsg}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-80 bg-gray-50 rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-gray-800 text-lg">Order Summary</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>৳{grandTotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-৳{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span className="text-red-500">৳{total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition mt-2"
          >
            {isLoggedIn ? "Proceed to Checkout" : "Sign In to Checkout"}
          </button>
          <Link
            to="/product"
            className="block text-center text-sm text-gray-500 hover:text-red-500 transition"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
