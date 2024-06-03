import React from "react";

interface TagProps {
  title: string;
  color: string;
}

const Tag: React.FC<TagProps> = ({ title, color }) => {
  return (
    <div
      className="text-[12px] rounded-[8px] text-white px-[4px]"
      style={{ backgroundColor: color }}
    >
      #
      {title}
    </div>
  );
};

export default Tag;
