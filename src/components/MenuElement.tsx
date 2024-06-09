import React from "react";
import { useNavigate } from "react-router-dom";

interface MenuElementProps {
  title: string;
  path: string;
}

const MenuElement: React.FC<MenuElementProps> = ({ title, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className="flex justify-between items-center w-full p-1 my-1 border-b-2 cursor-pointer text-hanaSilver hover:text-black"
      onClick={handleClick}
    >
      <span>{title}</span>
    </div>
  );
};

export default MenuElement;
