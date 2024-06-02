import React from "react";

interface TagProps {
  id: number;
  title: string;
}

function Tag({ id, title }: TagProps) {
  const tagId = id;
  return (
      <div className="text-[12px] bg-hanaGreen rounded-[8px] text-white px-[4px]">
        {title}
      </div>
  );
}

export default Tag;
