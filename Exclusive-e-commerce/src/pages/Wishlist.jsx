import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { removeFromWishlist, clearWishlist } from "../slice/wishlistSlice";
import { cartTotal } from "../slice/cartSlice";
import ProductRating from "../components/rating/ProductRating";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const [suggestions, setSuggestions] = useState([]);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/product/getallproduct?page=1&size=4`)
      .then(({ data }) => setSuggestions(data.data || []))
      .catch(() => {});
  }, []);

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => dispatch(cartTotal(item)));
    dispatch(clearWishlist());
  };

  const handleAddToCart = (item) => {
    dispatch(cartTotal(item));
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="py-8 md:py-12 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins text-lg text-black font-normal">
          Wishlist ({wishlistItems.length})
        </h2>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="border border-black/50 bg-white text-black hover:bg-gray-50 text-sm font-medium px-8 py-3 rounded transition-colors"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-400 mb-6 text-sm">Save items you love to your wishlist</p>
          <Link
            to="/product"
            className="bg-secondary hover:bg-red-600 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {wishlistItems.map((item) => (
            <div key={item._id} className="group relative">
              <div className="relative bg-[#F5F5F5] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {item.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold py-0.5 px-2 rounded">
                    -{item.discount}%
                  </div>
                )}
                <button
                  onClick={() => dispatch(removeFromWishlist(item))}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 hover:text-secondary transition shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`absolute bottom-0 w-full py-2.5 text-white text-xs md:text-sm font-medium flex items-center justify-center gap-2 bg-black hover:bg-secondary transition-all duration-300 ${
                    addedId === item._id ? "bg-green-500" : ""
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {addedId === item._id ? "Added!" : "Add To Cart"}
                </button>
              </div>
              <div className="mt-3">
                <Link to={`/productdetails/${item._id}`}>
                  <h3 className="font-medium text-sm text-gray-800 line-clamp-1 hover:text-secondary transition">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-secondary font-semibold text-sm">৳{item.price}</span>
                  {item.discount > 0 && (
                    <span className="text-gray-400 text-xs line-through">
                      ${Math.round(item.price * (1 + item.discount / 100))}
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <ProductRating rating={item.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Just For You */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-secondary rounded-[4px]" />
            <h2 className="font-inter font-semibold text-xl text-black">Just For You</h2>
          </div>
          <Link
            to="/product"
            className="border border-black/50 bg-white text-black hover:bg-gray-50 text-sm font-medium px-8 py-3 rounded transition-colors"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {suggestions.map((item) => (
            <div key={item._id} className="group">
              <Link to={`/productdetails/${item._id}`}>
                <div className="relative bg-[#F5F5F5] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold py-0.5 px-2 rounded">
                      -{item.discount}%
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(item);
                    }}
                    className={`absolute bottom-0 w-full py-2.5 text-white text-xs md:text-sm font-medium flex items-center justify-center gap-2 bg-black hover:bg-secondary transition-all duration-300 ${
                      addedId === item._id ? "bg-green-500" : ""
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {addedId === item._id ? "Added!" : "Add To Cart"}
                  </button>
                </div>
              </Link>
              <div className="mt-3">
                <h3 className="font-medium text-sm text-gray-800 line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-secondary font-semibold text-sm">৳{item.price}</span>
                  {item.discount > 0 && (
                    <span className="text-gray-400 text-xs line-through">
                      ${Math.round(item.price * (1 + item.discount / 100))}
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <ProductRating rating={item.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
