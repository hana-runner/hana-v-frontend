import React from "react";

interface TooltipType {
  children: React.ReactNode;
  message: string;
}

const Tooltip = ({ children, message }: TooltipType) => {
  return (
    <div className="relative inline-block w-auto h-auto group">
      {children}
      <div className="absolute hidden w-72 text-[10px] z-10 group-hover:block group-active:block">
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
