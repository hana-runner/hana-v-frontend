import React from "react";

interface PeoridBtnProps {
  month: number;
  description: string;
  width: string;
  height: string;
  selected: boolean;
  onClick: (month: number) => void;
}

function PeoridBtn({
  month, description, width = "w-[64px]", height = "h-[25px]", selected, onClick,
} : PeoridBtnProps) {
  return (
    <button type="button" value={month} className={`text-[12px] ${width} ${height} mx-[4px] bg-hanaSilver rounded-[8px] bg-opacity-35 ${selected ? "bg-white border-2 border-black" : ""}`} onClick={() => onClick(month)}>
      {description}
    </button>
  );
}

export default PeoridBtn;
