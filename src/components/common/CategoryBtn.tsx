import React from "react";

interface CategoryBtnProps {
  text: string;
  id: number;
  selected: boolean;
  onClick: (id: number) => void;
}
function CategoryBtn({
  text, id, selected, onClick,
}: CategoryBtnProps) {
  return (
    <button
      type="button"
      className={`w-[326px] h-[46px] rounded-[20px] text-left mt-[12px] pl-[24px] shadow-md ${selected ? "bg-hanaGreen bg-opacity-35" : "bg-white"}`}
      onClick={() => onClick(id)}
    >
      {text}
    </button>
  );
}

export default CategoryBtn;
