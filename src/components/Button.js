import React, { useState } from "react";

const Button = ({ label, styling, onClick, disabled, customColors }) => {
  const [clicked, setClicked] = useState(false);

  const variant = styling;
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
      label={label}
      className={styling}
      onClick={handleClick}
      disabled={disabled}
      style={{
        color:
          variant === "secondary"
            ? customColors.primaryColor
            : customColors.bgrColor,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
