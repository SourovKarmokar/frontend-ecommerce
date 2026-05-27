import { useEffect, useState } from "react";
export default function Timer() {
  const [time, setTime] = useState({
    days: 14,
    hours: 9,
    minutes: 24,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
        <div className="flex gap-x-2 bg-white w-[64px] h-[64px] rounded-full items-center justify-center">
          <div className="flex flex-col font-poppins font-medium text-[11px] leading-[18px] ">
            <span className="countdown   font-poppins font-semibold text-[20px]  mt-1">
              <span
                style={{ "--value": 15 }}
                aria-live="polite"
                aria-label={time.days}
              >
                {time.days}
              </span>
            </span>
            Days
          </div>
        </div>
        <div className="flex gap-x-2 bg-white w-[64px] h-[64px] rounded-full items-center justify-center">
          <div className="flex flex-col font-poppins font-medium text-[11px] leading-[18px]">
            <span className="countdown font-poppins font-semibold text-[20px]  mt-1">
              <span
                style={{ "--value": 10 }}
                aria-live="polite"
                aria-label={time.hours}
              >
                {time.hours}
              </span>
            </span>
            Hours
          </div>
        </div>
        <div className="flex gap-x-2 bg-white w-[64px] h-[64px] rounded-full items-center justify-center">
          <div className="flex flex-col font-poppins font-medium text-[11px] leading-[18px]">
            <span className="countdown font-poppins font-semibold text-[20px]  mt-1">
              <span
                style={{ "--value": 24 }}
                aria-live="polite"
                aria-label={time.minutes}
              >
                {time.minutes}
              </span>
            </span>
            Minutes
          </div>
        </div>
        <div className="flex gap-x-2 bg-white w-[64px] h-[64px] rounded-full items-center justify-center">
          <div className="flex flex-col font-poppins font-medium text-[11px] leading-[18px] ">
            <span className="countdown font-poppins font-semiBold text-[20px]  mt-1">
              <span
                style={{ "--value": 59 }}
                aria-live="polite"
                aria-label={time.seconds}
              >
                {time.seconds}
              </span>
            </span>
            Seconds
          </div>
        </div>
      </div>
    </>
  );
}
