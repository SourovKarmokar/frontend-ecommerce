import ps5 from "../../assets/ps5.png";
import womenHat from "../../assets/womenHat.png";
import speaker from "../../assets/speakers.png";
import perfume from "../../assets/perfume.png";

export default function Featured() {
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
          <div className="w-full md:w-[50%] overflow-hidden rounded-lg">
            <div className="bg-primary flex justify-center items-end pt-10 md:pt-[90px] px-7 group relative min-h-[280px] md:min-h-[400px]">
              <img
                src={ps5}
                alt="PlayStation 5"
                className="group-hover:scale-110 duration-300 max-h-[220px] md:max-h-none object-contain relative z-10"
              />
              <div className="absolute bottom-6 left-4 md:left-[32px] z-20">
                <h1 className="font-inter font-semibold text-lg md:text-[24px] text-[#FAFAFA]">
                  PlayStation 5
                </h1>
                <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[14px] mb-[16px]">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <button className="font-poppins font-medium text-sm md:text-base text-white underline underline-offset-4 cursor-pointer">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Right - 3 items */}
          <div className="w-full md:w-[50%] flex flex-col gap-4">
            {/* Women's Collections */}
            <div className="overflow-hidden rounded-lg">
              <div className="w-full relative group">
                <img
                  src={womenHat}
                  alt="Women's Collections"
                  className="w-full object-cover group-hover:scale-110 duration-300 max-h-[200px] md:max-h-none"
                />
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-[24px]">
                  <h1 className="font-inter font-semibold text-lg md:text-[24px] text-[#FAFAFA]">
                    Women's Collections
                  </h1>
                  <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[14px] mb-[16px]">
                    Featured woman collections that give you another vibe.
                  </p>
                  <button className="font-poppins font-medium text-sm md:text-base text-white underline underline-offset-4 cursor-pointer">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Speakers + Perfume */}
            <div className="flex gap-4">
              <div className="w-1/2 overflow-hidden rounded-lg">
                <div className="bg-primary group relative">
                  <img
                    src={speaker}
                    alt="Speakers"
                    className="w-full group-hover:scale-110 duration-300 object-cover"
                  />
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-[24px]">
                    <h1 className="font-inter font-semibold text-base md:text-[24px] text-[#FAFAFA]">
                      Speakers
                    </h1>
                    <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[8px] mb-[16px]">
                      Amazon wireless speakers
                    </p>
                    <button className="font-poppins font-medium text-sm text-white underline underline-offset-4 cursor-pointer">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-1/2 overflow-hidden rounded-lg">
                <div className="bg-primary group relative h-full">
                  <img
                    src={perfume}
                    alt="Perfume"
                    className="w-full h-full object-cover group-hover:scale-110 duration-300"
                  />
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-[24px]">
                    <h1 className="font-inter font-semibold text-base md:text-[24px] text-[#FAFAFA]">
                      Perfume
                    </h1>
                    <p className="hidden md:block font-poppins font-normal text-[14px] text-[#FAFAFA] mt-[8px] mb-[16px]">
                      GUCCI INTENSE OUD EDP
                    </p>
                    <button className="font-poppins font-medium text-sm text-white underline underline-offset-4 cursor-pointer">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
