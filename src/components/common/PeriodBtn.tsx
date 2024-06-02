import React from "react";

interface PeriodBtnProps {
  month: number;
  description: string;
  width: string;
  height: string;
  selected: boolean;
  onClick: (month: number) => void;
}

function PeriodBtn({
  month, description, width = "w-[64px]", height = "h-[25px]", selected, onClick,
} : PeriodBtnProps) {
  return (
    <button type="button" value={month} className={`text-[12px] ${width} ${height} mx-[4px] bg-hanaSilver rounded-[8px] bg-opacity-35 ${selected ? "bg-white border-2 border-black" : ""}`} onClick={() => onClick(month)}>
      {description}
    </button>
  );
}

export default PeriodBtn;
