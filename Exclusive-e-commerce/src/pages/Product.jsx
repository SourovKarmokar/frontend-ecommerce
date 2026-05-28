import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartTotal } from "../slice/cartSlice";
import ProductRating from "../components/rating/ProductRating";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import API_BASE_URL from "../config/api";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(9);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get("category");
  const subCategoryId = searchParams.get("subCategory");
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/category/getallcategories`);
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/v1/product/getallproduct?page=${currentPage}&size=${productPerPage}`;
      if (categoryId) {
        url += `&category=${categoryId}`;
      }
      if (subCategoryId) {
        url += `&subCategory=${subCategoryId}`;
      }
      const { data } = await axios.get(url);
      setTotalData(data.total);
      setProduct(data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pageArr = [...Array(Math.ceil(totalData / productPerPage)).keys()].map((i) => i + 1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, categoryId, subCategoryId]);

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(cartTotal(item));
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <h2 className="font-bold text-lg text-gray-800 mb-4">Filters</h2>
      <div className="mb-5">
        <h3 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">Category</h3>
        <label className="flex items-center gap-2 py-1.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={!categoryId}
            onChange={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("category");
              params.delete("subCategory");
              setSearchParams(params);
              setCurrentPage(1);
            }}
            className="rounded accent-red-500 w-4 h-4"
          />
          <span className={`text-sm transition ${!categoryId ? "text-red-500 font-semibold" : "text-gray-600 group-hover:text-red-500"}`}>
            All Categories
          </span>
        </label>
        {categories.map((cat) => (
          <div key={cat._id} className="flex flex-col ml-1">
            <label className="flex items-center gap-2 py-1.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={categoryId === cat._id}
                onChange={() => {
                  const params = new URLSearchParams(searchParams);
                  if (categoryId === cat._id) {
                    params.delete("category");
                  } else {
                    params.set("category", cat._id);
                  }
                  params.delete("subCategory"); // Reset subcategory when category changes
                  setSearchParams(params);
                  setCurrentPage(1);
                }}
                className="rounded accent-red-500 w-4 h-4"
              />
              <span className={`text-sm transition ${categoryId === cat._id ? "text-red-500 font-semibold" : "text-gray-600 group-hover:text-red-500"}`}>
                {cat.name}
              </span>
            </label>
            {cat.subCategory && cat.subCategory.length > 0 && (
              <div className="pl-6 flex flex-col gap-1 border-l border-gray-100 ml-2 mb-2">
                {cat.subCategory.map((sub) => (
                  <label key={sub._id} className="flex items-center gap-2 py-1 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={subCategoryId === sub._id}
                      onChange={() => {
                        const params = new URLSearchParams(searchParams);
                        params.set("category", cat._id);
                        if (subCategoryId === sub._id) {
                          params.delete("subCategory");
                        } else {
                          params.set("subCategory", sub._id);
                        }
                        setSearchParams(params);
                        setCurrentPage(1);
                      }}
                      className="rounded accent-red-500 w-3.5 h-3.5"
                    />
                    <span className={`text-xs transition ${subCategoryId === sub._id ? "text-red-500 font-semibold" : "text-gray-500 group-hover:text-red-500"}`}>
                      {sub.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">Price Range</h3>
        <input type="range" min="0" max="2000" className="w-full accent-red-500" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>৳0</span>
          <span>৳2000</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-6 md:my-9">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h2 className="font-bold text-lg text-gray-800">
          Products {totalData > 0 && <span className="text-gray-400 font-normal text-sm">({totalData})</span>}
        </h2>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Mobile filter drawer */}
      {showFilter && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilter(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilter(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-56 lg:w-64 flex-shrink-0">
          <div className="sticky top-4">
            <FilterSidebar />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="hidden md:flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-800">
              All Products {totalData > 0 && <span className="text-gray-400 font-normal text-sm">({totalData} items)</span>}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse" />
              ))}
            </div>
          ) : product.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-gray-400 text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
              {product.map((item) => (
                <div key={item._id} className="group">
                  <Link to={`/productdetails/${item._id}`}>
                    <div className="relative bg-[#F5F5F5] rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                      <img
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 p-3 md:p-4"
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                      />
                      {item.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-semibold py-0.5 px-2 rounded-md">
                          -{item.discount}%
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white absolute right-2 top-2 flex items-center justify-center hover:bg-red-500 hover:text-white transition shadow-sm z-10"
                      >
                        <FaRegHeart className="text-xs md:text-sm" />
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`absolute bottom-0 w-full py-2 text-white text-xs md:text-sm font-medium z-10
                        transition-all duration-300 ${addedId === item._id ? "bg-green-500" : "bg-black hover:bg-secondary"}`}
                      >
                        {addedId === item._id ? "✓ Added!" : "Add To Cart"}
                      </button>
                    </div>
                  </Link>
                  <div className="mt-2 md:mt-3 px-1">
                    <h3 className="font-medium text-xs md:text-sm text-gray-800 line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-red-500 font-semibold text-xs md:text-sm">৳{item.price}</span>
                      {item.discount > 0 && (
                        <span className="text-gray-400 text-[10px] md:text-xs line-through">
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

          {/* Pagination */}
          {pageArr.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-8 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {pageArr.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-lg text-xs md:text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-red-500 text-white shadow-md"
                      : "border hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === pageArr.length}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
