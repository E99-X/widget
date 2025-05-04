import React from "react";

const Toggle = ({ isEnabled = false, onToggle = () => {}, disabled = false }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={Boolean(isEnabled)} 
        onChange={onToggle}
        disabled={disabled}
      />
      <span className={`slider round ${isEnabled ? "active" : "inactive"}`} />
    </label>
  );
};

export default Toggle;
