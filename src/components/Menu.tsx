import clsx from "clsx";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface MenuProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Menu: React.FC<MenuProps> = ({ title, isActive, onClick }) => {
  return (
    <div
      className={clsx(
        "flex justify-between items-center w-full pb-1 my-1 border-b-2 cursor-pointer",
        {
          "border-hanaGreen": isActive,
          "border-transparent": !isActive,
        },
      )}
      onClick={onClick}
    >
      <span
        className={clsx({
          " text-hanaGreen": isActive,
          "hover:text-hanaGreen": !isActive,
        })}
      >
        {title}
      </span>
      {isActive && <IoIosArrowForward className="text-hanaGreen" />}
    </div>
  );
};

export default Menu;
