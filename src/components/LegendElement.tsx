import React from "react";

export interface CategoryType {
  title: string;
  ratio: number;
  color: string;
  unit: string;
}

const LegendElement = ({ title, ratio, color, unit }: CategoryType) => {
  return (
    <div className="flex justify-between py-1">
      <div className="w-1/2 flex justify-start items-center">
        <div
          className="size-2 rounded-full mr-2"
          style={{ backgroundColor: color }}
        ></div>
        <div>{title}</div>
      </div>
      <div>
        <div>
          {ratio.toLocaleString()} {unit}
        </div>
      </div>
    </div>
  );
};

export default LegendElement;
