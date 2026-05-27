import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartTotal } from "../../slice/cartSlice";
import { FaRegHeart } from "react-icons/fa";
import ProductRating from "../rating/ProductRating";
import API_BASE_URL from "../../config/api";

export default function OurProducts() {
  const [products, setProducts] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/product/getallproduct?page=1&size=12`)
      .then(({ data }) => setProducts(data.data || []))
      .catch(() => {});
  }, []);

  const handleAdd = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(cartTotal(item));
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="mt-16 md:mt-[71px]">
      <div className="flex items-center gap-x-[10px]">
        <div className="w-5 h-10 bg-secondary rounded-[4px]" />
        <p className="font-poppins font-semibold text-base text-secondary">Our Products</p>
      </div>
      <div className="mt-5">
        <h1 className="font-inter font-semibold text-2xl md:text-[36px] text-primary">
          Explore Our Products
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="mt-8 md:mt-[60px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
          {products.map((item) => (
            <div key={item._id} className="group">
              <Link to={`/productdetails/${item._id}`}>
                <div className="relative bg-[#F5F5F5] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-110 transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-secondary text-white text-[10px] md:text-xs font-semibold py-0.5 px-2 rounded">
                      -{item.discount}%
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white absolute right-2 top-2 flex items-center justify-center hover:bg-secondary hover:text-white transition shadow-sm z-10"
                  >
                    <FaRegHeart className="text-xs md:text-sm" />
                  </button>
                  <button
                    onClick={(e) => handleAdd(e, item)}
                    className={`absolute bottom-0 w-full py-2 text-white text-xs md:text-sm font-medium z-10
                    transition-all duration-300 ${addedId === item._id ? "bg-green-500" : "bg-black hover:bg-secondary"}`}
                  >
                    {addedId === item._id ? "✓ Added!" : "Add To Cart"}
                  </button>
                </div>
              </Link>
              <div className="mt-2 md:mt-3">
                <h3 className="font-poppins font-medium text-xs md:text-sm text-black line-clamp-1">{item.name}</h3>
                <div className="mt-1 flex gap-2 items-center">
                  <span className="font-poppins font-semibold text-xs md:text-sm text-secondary">৳{item.price}</span>
                  {item.discount > 0 && (
                    <span className="text-[10px] md:text-xs text-gray-400 line-through">
                      ${Math.round(item.price * (1 + item.discount / 100))}
                    </span>
                  )}
                </div>
                <div className="mt-1 scale-90 origin-left">
                  <ProductRating rating={item.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/product"
          className="inline-block font-poppins font-medium text-base text-white bg-secondary py-4 px-12 rounded-[4px] hover:bg-primary transition duration-300"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
