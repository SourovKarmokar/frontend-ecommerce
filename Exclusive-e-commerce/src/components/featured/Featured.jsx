import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ps5 from "../../assets/ps5.png";
import womenHat from "../../assets/womenHat.png";
import speaker from "../../assets/speakers.png";
import perfume from "../../assets/perfume.png";
import API_BASE_URL from "../../config/api";

export default function Featured() {
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

  const getLinks = () => {
    let electronicsId = "";
    let gamingId = "";
    let womanId = "";
    let beautyId = "";

    categories.forEach((cat) => {
      const catName = cat.name.toLowerCase();
      if (catName.includes("electronic")) {
        electronicsId = cat._id;
        if (cat.subCategory) {
          const sub = cat.subCategory.find((s) => s.name.toLowerCase().includes("gaming"));
          if (sub) gamingId = sub._id;
        }
      } else if (catName.includes("woman") || catName.includes("women")) {
        womanId = cat._id;
      } else if (catName.includes("beauty") || catName.includes("health")) {
        beautyId = cat._id;
      }
    });

    return {
      ps5: gamingId ? `/product?category=${electronicsId}&subCategory=${gamingId}` : `/product?category=${electronicsId}`,
      women: womanId ? `/product?category=${womanId}` : "/product",
      speaker: electronicsId ? `/product?category=${electronicsId}` : "/product",
      perfume: beautyId ? `/product?category=${beautyId}` : "/product"
    };
  };

  const links = getLinks();

  return (
    <>
      <div className="mt-16 md:mt-[140px]">
        <div className="flex items-center gap-x-3">
          <div className="w-5 h-10 bg-secondary rounded-[4px]"></div>
          <p className="font-poppins font-semibold text-base text-secondary">Today's</p>
        </div>
        <div className="mt-5">
          <h1 className="font-inter font-semibold text-2xl md:text-[36px] text-primary">
            New Arrival
          </h1>
        </div>

        <div className="w-full mt-8 md:mt-[60px] flex flex-col md:flex-row gap-4 md:gap-7">
          {/* Left - PS5 */}
          <Link
            to={links.ps5}
            className="w-full md:w-[50%] overflow-hidden rounded-lg block cursor-pointer"
          >
            <div className="bg-primary flex justify-center items-end pt-10 md:pt-[90px] px-7 group relative min-h-[280px] md:min-h-[400px]">
              <img
                src={ps5}
                alt="PlayStation 5"
                className="group-hover:scale-105 duration-300 max-h-[220px] md:max-h-none object-contain relative z-10"
              />
              <div className="absolute bottom-6 left-4 md:left-[32px] z-20">
                <h1 className="font-inter font-semibold text-lg md:text-[24px] text-[#FAFAFA]">
                  PlayStation 5
                </h1>
                <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[14px] mb-[16px] max-w-[90%] opacity-90">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <span className="font-poppins font-medium text-sm md:text-base text-white underline underline-offset-4 block mt-2">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>

          {/* Right - 3 items */}
          <div className="w-full md:w-[50%] flex flex-col gap-4">
            {/* Women's Collections */}
            <Link
              to={links.women}
              className="overflow-hidden rounded-lg block cursor-pointer"
            >
              <div className="w-full relative group">
                <img
                  src={womenHat}
                  alt="Women's Collections"
                  className="w-full object-cover group-hover:scale-105 duration-300 max-h-[200px] md:max-h-none"
                />
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-[24px] z-20">
                  <h1 className="font-inter font-semibold text-lg md:text-[24px] text-[#FAFAFA]">
                    Women's Collections
                  </h1>
                  <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[14px] mb-[16px] max-w-[90%] opacity-90">
                    Featured woman collections that give you another vibe.
                  </p>
                  <span className="font-poppins font-medium text-sm md:text-base text-white underline underline-offset-4 block mt-2">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>

            {/* Speakers + Perfume */}
            <div className="flex gap-4">
              <Link
                to={links.speaker}
                className="w-1/2 overflow-hidden rounded-lg block cursor-pointer"
              >
                <div className="bg-primary group relative h-full">
                  <img
                    src={speaker}
                    alt="Speakers"
                    className="w-full group-hover:scale-105 duration-300 object-cover h-full min-h-[150px]"
                  />
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-[24px] z-20">
                    <h1 className="font-inter font-semibold text-base md:text-[24px] text-[#FAFAFA]">
                      Speakers
                    </h1>
                    <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[8px] mb-[16px] opacity-90">
                      Amazon wireless speakers
                    </p>
                    <span className="font-poppins font-medium text-sm text-white underline underline-offset-4 block mt-1">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                to={links.perfume}
                className="w-1/2 overflow-hidden rounded-lg block cursor-pointer"
              >
                <div className="bg-primary group relative h-full">
                  <img
                    src={perfume}
                    alt="Perfume"
                    className="w-full h-full object-cover group-hover:scale-105 duration-300 min-h-[150px]"
                  />
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-[24px] z-20">
                    <h1 className="font-inter font-semibold text-base md:text-[24px] text-[#FAFAFA]">
                      Perfume
                    </h1>
                    <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[8px] mb-[16px] opacity-90">
                      GUCCI INTENSE OUD EDP
                    </p>
                    <span className="font-poppins font-medium text-sm text-white underline underline-offset-4 block mt-1">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
