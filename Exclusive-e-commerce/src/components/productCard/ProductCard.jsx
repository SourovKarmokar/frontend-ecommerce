import { Eye, Heart } from "lucide-react";
import { BiSolidStar } from "react-icons/bi";
export default function ProductCard({ products }) {
  return (
    <>
      {products.map((item) => (
        <div key={item.id}>
          <div className="overflow-hidden">
            <div className="relative group bg-[#F5F5F5] w-[270px] h-[250px] flex items-center justify-center rounded-[4px]">
              <img
                className="group-hover:scale-125 duration-300"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute top-[12px] left-[12px] font-poppins font-normal text-[12px] leading-[18px] text-white py-[4px] px-[12px] bg-secondary rounded-[4px]">
                -
                {Math.round(
                  ((item.mainprice - item.offerprice) / item.mainprice) * 100
                )}
                %
              </div>
              <div 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                className="w-[34px] h-[34px] rounded-full bg-white absolute right-[12px] top-[12px] flex items-center justify-center hover:bg-secondary hover:text-white duration-300 z-10 cursor-pointer"
              >
                <Heart />
              </div>
              <div 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                className="w-[34px] h-[34px] rounded-full bg-white absolute right-[12px] top-[54px] flex items-center justify-center hover:bg-secondary hover:text-white duration-300 z-10 cursor-pointer"
              >
                <Eye />
              </div>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                className="absolute bottom-0 w-full py-2.5 bg-black hover:bg-secondary text-white text-xs md:text-sm font-medium z-10 transition-all duration-300 cursor-pointer"
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className="mt-[16px]">
            <h1 className="font-poppins font-medium text-[16px] leading-[24px] text-black">
              {item.title}
            </h1>
            <div className="mt-2 flex gap-x-3">
              <span className="font-poppins font-medium text-[16px] leading-[24px] text-secondary">
                ${item.offerprice}
              </span>
              <span className="font-poppins font-medium text-[16px] leading-[24px] text-[rgba(0,0,0,0.5)] line-through">
                ${item.mainprice}
              </span>
            </div>
            <div className="mt-2 flex gap-x-2">
              <div className="flex">
                {[...Array(5)].map((_, index) =>
                  index < item.stars ? (
                    <BiSolidStar key={index} color="#FFAD33" />
                  ) : (
                    <BiSolidStar key={index} className="text-black/25" />
                  )
                )}
              </div>
              <span className="font-poppins font-semibold text-[14px] leading-[21px] text-[rgba(0,0,0,0.5)]">
                ({item.rating})
              </span>
            </div>
            <div>
              {item.colors && (
                <div className="flex gap-2 mt-2">
                  {item.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border p-0.5 cursor-pointer"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
