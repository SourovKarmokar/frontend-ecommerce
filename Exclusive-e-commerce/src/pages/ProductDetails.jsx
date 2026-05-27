import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import ProductRating from '../components/rating/ProductRating';
import { FiHeart } from 'react-icons/fi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlineKeyboardReturn } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { cartTotal } from '../slice/cartSlice';
import API_BASE_URL from '../config/api';
import { ShoppingCart, Check } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartInfo.value);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const isInCart = cartItems.some((item) => item._id === id);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/singleproduct/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(cartTotal(product));
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="text-5xl">😕</div>
        <p className="text-xl font-semibold text-gray-700">Product not found</p>
        <Link to="/product" className="text-red-500 hover:underline text-sm">← Back to Products</Link>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'black', value: '#000000' },
    { name: 'red', value: '#EF4444' },
    { name: 'blue', value: '#3B82F6' },
  ];

  const discountedPrice = product.discount > 0
    ? Math.round(product.price * (1 + product.discount / 100))
    : null;

  return (
    <div className="w-full bg-white py-4 md:py-8">
      {/* Breadcrumb */}
      <nav className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-red-500 transition">Home</Link>
        <span>/</span>
        <Link to="/product" className="hover:text-red-500 transition">Products</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium line-clamp-1 max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* ── Left: Images ── */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible order-2 sm:order-1 pb-1 sm:pb-0">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  activeImg === i ? 'border-red-500 shadow-md' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#F5F5F5] rounded-xl overflow-hidden order-1 sm:order-2 relative group">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold py-1 px-2.5 rounded-md">
                -{product.discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Info ── */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
            {product.name}
          </h1>

          {/* Rating row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <ProductRating rating={product.rating || 4} />
            <span className="text-xs text-gray-400">(150 Reviews)</span>
            <span className="text-xs text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl md:text-3xl font-bold text-red-500">৳{product.price}</span>
            {discountedPrice && (
              <span className="text-lg text-gray-400 line-through">৳{discountedPrice}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-5 pb-5 border-b">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mb-4">
            <p className="font-semibold text-sm mb-2">
              Colour: <span className="font-normal text-gray-600 capitalize">{selectedColor}</span>
            </p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                    selectedColor === color.name
                      ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-400'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-5">
            <p className="font-semibold text-sm mb-2">
              Size: <span className="font-normal text-gray-600">{selectedSize}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[44px] px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-red-500 text-white border-red-500 shadow-md'
                      : 'border-gray-300 hover:border-red-400 hover:text-red-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 mb-5">
            {/* Qty */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2.5 hover:bg-gray-100 text-gray-600 font-bold text-lg transition"
              >
                −
              </button>
              <span className="px-4 py-2.5 font-semibold text-sm min-w-[3rem] text-center border-x-2 border-gray-200">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2.5 hover:bg-red-500 hover:text-white text-gray-600 font-bold text-lg transition"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm md:text-base transition-all shadow-md ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {isInCart ? 'Add More' : 'Add to Cart'}
                </>
              )}
            </button>

            {/* Wishlist */}
            <button className="w-12 h-12 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:text-red-500 transition flex items-center justify-center flex-shrink-0">
              <FiHeart className="text-xl" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border rounded-xl overflow-hidden">
            <div className="flex items-start gap-3 p-3 md:p-4 border-b bg-gray-50">
              <TbTruckDelivery className="text-2xl flex-shrink-0 mt-0.5 text-red-500" />
              <div>
                <h3 className="font-semibold text-sm mb-0.5">Free Delivery</h3>
                <p className="text-xs text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 md:p-4 bg-gray-50">
              <MdOutlineKeyboardReturn className="text-2xl flex-shrink-0 mt-0.5 text-red-500" />
              <div>
                <h3 className="font-semibold text-sm mb-0.5">Return Delivery</h3>
                <p className="text-xs text-gray-500">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
