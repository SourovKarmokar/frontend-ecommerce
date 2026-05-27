import Timer from "./timer";
import jblSpeaker from "../../assets/jblSpeaker.png";

export default function PromotionalProduct() {
  return (
    <>
      <div className="mt-16 md:mt-[140px] bg-primary flex flex-col md:flex-row items-center justify-between group rounded-lg overflow-hidden">
        <div className="py-10 md:py-[69px] px-6 md:pl-[69px] text-center md:text-left">
          <p className="font-poppins font-semibold text-base text-[#00FF66]">
            Categories
          </p>
          <h1 className="font-inter font-semibold text-3xl md:text-[48px] md:leading-[60px] text-[#FAFAFA] mt-6 md:mt-8">
            Enhance Your
            <br />
            Music Experience
          </h1>
          <div className="mt-6 md:mt-8">
            <Timer />
          </div>
          <button className="font-poppins font-medium text-base text-[#FAFAFA] bg-[#00FF66] py-3 md:py-4 px-10 md:px-12 rounded-[4px] cursor-pointer hover:bg-[#00ff66c2] duration-300 mt-8 md:mt-[40px]">
            Buy Now!
          </button>
        </div>
        <div className="relative px-6 md:pr-[69px] cursor-pointer pb-6 md:pb-0">
          <img src={jblSpeaker} className="relative z-10 max-w-[280px] md:max-w-none mx-auto" alt="JBL Speaker" />
          <div className="absolute w-0 h-0 group-hover:w-full group-hover:h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-white/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
}
