import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import API_BASE_URL from "../../config/api";

// Fallback gradient backgrounds for slides
const BG_COLORS = ["#000000", "#1a1a2e", "#16213e", "#0f3460", "#1b1b2f"];

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/product/getallproduct?page=1&size=5`)
      .then(({ data }) => setSlides(data.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (paused || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [paused, slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  if (slides.length === 0) {
    return (
      <div className="ml-0 md:ml-4 mt-6 md:mt-[40px] h-[200px] md:h-[344px] bg-gray-900 rounded-lg animate-pulse" />
    );
  }

  return (
    <div
      className="ml-0 md:ml-4 mt-6 md:mt-[40px] relative overflow-hidden rounded-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((product, i) => (
          <div
            key={product._id}
            className="min-w-full flex items-center justify-between h-[200px] sm:h-[280px] md:h-[344px] px-6 md:px-[54px]"
            style={{ backgroundColor: BG_COLORS[i % BG_COLORS.length] }}
          >
            {/* Text */}
            <div className="flex-1 pr-4">
              <p className="text-gray-400 font-poppins text-xs md:text-base mb-1 md:mb-2">
                {product.name}
              </p>
              <h2 className="text-white font-inter font-bold text-xl sm:text-3xl md:text-[48px] md:leading-[60px] mb-3 md:mb-6">
                Save up to{" "}
                <span className="text-red-400">
                  {product.discount > 0 ? `${product.discount}%` : "50%"}
                </span>
              </h2>
              <Link
                to={`/productdetails/${product._id}`}
                className="inline-flex items-center gap-2 text-white text-sm md:text-base font-medium border-b border-white hover:text-red-400 hover:border-red-400 transition-colors"
              >
                Shop Now
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Image */}
            <div className="flex-shrink-0 w-[120px] sm:w-[180px] md:w-[260px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[140px] sm:h-[200px] md:h-[280px] object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
