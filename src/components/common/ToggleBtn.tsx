import React, { useState } from "react";

const ToggleBtn = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <button
      type="button"
      className={`relative w-12 h-[24px] bg-gray-300 rounded-full transition-colors duration-300 ${isOn ? "bg-green-500" : ""}`}
      onClick={handleClick}
    >
      {}
      <span
        className={`block w-6 h-6 rounded-full bg-white shadow-md transform ${isOn ? "translate-x-full" : ""}`}
      />
    </button>
  );
};

export default ToggleBtn;
