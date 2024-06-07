import React from "react";
import { useNavigate } from "react-router-dom";

interface MenuSlideType {}

const MenuSlide = ({ menuList, isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 transition-transform ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {menuList.map((menu, index) => (
          <div
            key={index}
            className="py-2 text-center border-t border-gray-300 cursor-pointer"
            onClick={menu.action}
          >
            {menu.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSlide;
