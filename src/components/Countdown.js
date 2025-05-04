import React, { useEffect, useState } from "react";

const Countdown = ({ summary, stageView }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
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

    // Check if finModeText exists before rendering it
    if (!summary || !summary.finModeText) {
      return <div>Loading...</div>; // Return loading state if summary or finModeText is not available
    }

  return (
    <div className="text-center">
      <p className="">{summary.finModeText == "Join Pool" ? 'Next Stage starts in:' : 'Burning in:'}</p>
      <div className="heading text-primary margin-top">
        <span>{String(timeLeft.days).padStart(2, "0")}d :</span>{" "}
        <span>{String(timeLeft.hours).padStart(2, "0")}h :</span>{" "}
        <span>{String(timeLeft.minutes).padStart(2, "0")}m :</span>{" "}
        <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </div>
    </div>
  );
};

export default Countdown;
