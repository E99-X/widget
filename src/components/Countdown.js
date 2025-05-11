import React, { useEffect, useState } from "react";

const Countdown = ({ summary, stageView, customColors }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!stageView?.endMs) return;

    const endDate = new Date(stageView.endMs);

    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = endDate - now;
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [stageView?.endMs]);

  if (!summary || !summary.finModeText) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <p className="">
        {summary.finModeText == "Join Pool"
          ? "Next Stage starts in:"
          : "Burning in:"}
      </p>
      <div className="countdownText text-primary m-top-sm">
        <span style={{ color: customColors.primaryColor }}>
          {String(timeLeft.days).padStart(2, "0")}d -
        </span>{" "}
        <span style={{ color: customColors.primaryColor }}>
          {String(timeLeft.hours).padStart(2, "0")}h -
        </span>{" "}
        <span style={{ color: customColors.primaryColor }}>
          {String(timeLeft.minutes).padStart(2, "0")}m -
        </span>{" "}
        <span style={{ color: customColors.primaryColor }}>
          {String(timeLeft.seconds).padStart(2, "0")}s
        </span>
      </div>
    </div>
  );
};

export default Countdown;
