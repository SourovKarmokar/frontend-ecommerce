import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Camera,
  Gamepad,
  Headphones,
  Monitor,
  Smartphone,
  Watch,
} from "lucide-react";
import API_BASE_URL from "../../config/api";

const getCategoryIcon = (name) => {
  const lowercase = name.toLowerCase();
  if (lowercase.includes("phone")) return <Smartphone size={40} />;
  if (lowercase.includes("computer") || lowercase.includes("laptop")) return <Monitor size={40} />;
  if (lowercase.includes("watch")) return <Watch size={40} />;
  if (lowercase.includes("camera")) return <Camera size={40} />;
  if (lowercase.includes("headphone")) return <Headphones size={40} />;
  if (lowercase.includes("gaming") || lowercase.includes("game")) return <Gamepad size={40} />;
  // Fallbacks for other categories
  if (lowercase.includes("fashion") || lowercase.includes("dress") || lowercase.includes("shirt")) return <span className="text-2xl">👕</span>;
  if (lowercase.includes("home") || lowercase.includes("furniture") || lowercase.includes("life")) return <span className="text-2xl">🏠</span>;
  if (lowercase.includes("medicine") || lowercase.includes("drug") || lowercase.includes("health")) return <span className="text-2xl">💊</span>;
  if (lowercase.includes("sport") || lowercase.includes("fit")) return <span className="text-2xl">⚽</span>;
  if (lowercase.includes("baby") || lowercase.includes("toy")) return <span className="text-2xl">🧸</span>;
  if (lowercase.includes("grocery") || lowercase.includes("food")) return <span className="text-2xl">🍎</span>;
  if (lowercase.includes("beauty") || lowercase.includes("cosmetic")) return <span className="text-2xl">💄</span>;
  return <span className="text-2xl">📦</span>;
};

export default function Catagories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/v1/category/getallcategories`);
        if (data.success) {
          setCategories(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="mt-[80px] pb-[70px] border-b-[1px] border-[rgba(0,0,0,0.3)]">
        <div className="flex gap-x-4 items-center">
          <div className="w-[20px] h-[40px] bg-secondary rounded-[4px]"></div>
          <p className="font-poppins font-semibold text-[16px] leading-[20px] text-secondary">
            Categories
          </p>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="font-inter font-semibold text-[36px] leading-[48px] text-primary">
            Browse By Category
          </h1>
          <Link
            to="/product"
            className="inline-block font-poppins font-medium text-sm text-white bg-secondary py-2.5 px-6 rounded-[4px] hover:bg-primary transition duration-300 text-center"
          >
            View All Categories
          </Link>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-10 md:mt-[60px]">
          {categories.map((cat) => (
            <Link
              to={`/product?category=${cat._id}`}
              key={cat._id}
              className="w-[calc(50%-8px)] sm:w-[calc(25%-12px)] md:w-[170px] h-[130px] rounded-[4px] border border-black/30 flex flex-col items-center justify-center gap-y-3 group hover:bg-secondary duration-300 cursor-pointer text-center p-2"
            >
               <p className="group-hover:text-[#FAFAFA] text-gray-700">{getCategoryIcon(cat.name)}</p>
               <span className="font-poppins font-medium text-xs sm:text-sm text-primary group-hover:text-[#FAFAFA] truncate w-full px-1">
                 {cat.name}
               </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
