import React from "react";
import { FaCircle } from "react-icons/fa";

export interface CategoryType {
  title: string;
  ratio: number;
  color: string;
}

const LegendElement = ({ title, ratio, color }: CategoryType) => {
  return (
    <div className="flex justify-between py-1">
      <div className="w-1/2 flex justify-start items-center">
        <FaCircle style={{ color }} className="w-2 h-2 mr-2" />
        <div>{title}</div>
      </div>
      <div>
        <div>{ratio} %</div>
      </div>
    </div>
  );
};

export default LegendElement;
