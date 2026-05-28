import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Slider from "../../components/slider/Slider";
import Container from "../container/Container";
import API_BASE_URL from "../../config/api";

export default function Banner() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
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
    fetchCategories();
  }, []);

  return (
    <>
      <Container>
        <div className="flex flex-col md:flex-row w-full relative">
          <div className="hidden md:block w-[22%] border-r border-black/10 pr-4">
            <div className="pt-[40px] flex flex-col gap-y-[16px] relative z-20">
              {categories.map((cat) => {
                const hasSubs = cat.subCategory && cat.subCategory.length > 0;
                return (
                  <div
                    key={cat._id}
                    className="relative group"
                    onMouseEnter={() => setActiveCategory(cat._id)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <Link
                      to={`/product?category=${cat._id}`}
                      className="font-poppins font-normal text-[15px] leading-[24px] text-primary flex justify-between items-center hover:text-secondary transition py-1"
                    >
                      <span>{cat.name}</span>
                      {hasSubs && <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary transition" />}
                    </Link>

                    {hasSubs && activeCategory === cat._id && (
                      <div className="absolute left-[100%] top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-xl py-3 px-4 min-w-[200px] flex flex-col gap-y-2.5 z-30">
                        <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider border-b pb-1.5 mb-1">{cat.name}</p>
                        {cat.subCategory.map((sub) => (
                          <Link
                            key={sub._id}
                            to={`/product?category=${cat._id}&subCategory=${sub._id}`}
                            className="font-poppins text-sm text-gray-600 hover:text-secondary hover:translate-x-1 duration-200"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-[78%]">
            <Slider />
          </div>
        </div>
      </Container>
    </>
  );
}
