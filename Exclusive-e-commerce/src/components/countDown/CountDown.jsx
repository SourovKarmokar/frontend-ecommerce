import { useEffect, useState } from "react";

export default function CountDown() {
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
        <div className="flex gap-x-2">
          <div className="flex flex-col font-poppins font-medium text-[12px leading-[18px] ">
            days
            <span className="countdown   font-inter font-bold text-[32px] leading-[30px] mt-1">
              <span
                style={{ "--value": 15 } }
                aria-live="polite"
                aria-label={time.days}
              >
                {time.days}
              </span>
            </span>
          </div>
          <div className="text-[30px] text-secondary self-end">:</div>
        </div>
        <div className="flex gap-x-2">
          <div className="flex flex-col font-poppins font-medium text-[12px leading-[18px]">
            hours
            <span className="countdown font-inter font-bold text-[32px] leading-[30px] mt-1">
              <span
                style={{ "--value": 10 }}
                aria-live="polite"
                aria-label={time.hours}
              >
                {time.hours}
              </span>
            </span>
          </div>
          <div className="text-[30px] text-secondary self-end">:</div>
        </div>
        <div className="flex gap-x-2">
          <div className="flex flex-col font-poppins font-medium text-[12px leading-[18px]">
            min
            <span className="countdown font-inter font-bold text-[32px] leading-[30px] mt-1">
              <span
                style={{ "--value": 24 }}
                aria-live="polite"
                aria-label={time.minutes}
              >
                {time.minutes}
              </span>
            </span>
          </div>
          <div className="text-[30px] text-secondary self-end">:</div>
        </div>
        <div className="flex flex-col font-poppins font-medium text-[12px leading-[18px]">
          sec
          <span className="countdown font-inter font-bold text-[32px] leading-[30px] mt-1">
            <span
              style={{ "--value": 59 }}
              aria-live="polite"
              aria-label={time.seconds}
            >
              {time.seconds}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
