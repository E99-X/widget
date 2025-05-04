import React, { useState } from "react";

const Button = ({ label, style, onClick, disabled }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 200);

    if (onClick) onClick();
  };

  return (
    <button
      className={`button ${style} ${clicked ? "reset" : ""}`} 
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
