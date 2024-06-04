import React, { useState } from "react";

interface CategoryBtnProps {
  text: string;
}

function CategoryBtn({ text }: CategoryBtnProps) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <button
      type="button"
      className={`w-[px] h-[px] rounded-[px] bg-white shadow-md ${clicked ? "bg-hanaGreen-300" : "bg-white"}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default CategoryBtn;
