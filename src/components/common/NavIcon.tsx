import React from "react";
import { BiBell, BiHomeAlt2 } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NavIcon = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    const { id } = e.currentTarget as SVGAElement;
    if (id === "notification") {
      navigate("/notification");
    }
    if (id === "home") {
      navigate("/home");
    }
    if (id === "menu") {
      navigate("/menu");
    }
  };

  return (
    <div className="absolute right-5 flex justify-between items-center gap-3">
      <BiBell
        id="notification"
        className="mt-[2px]"
        size={20}
        onClick={(e) => handleClick(e)}
      />
      <BiHomeAlt2 id="home" size={20} onClick={(e) => handleClick(e)} />
      <IoMenu id="menu" size={20} onClick={(e) => handleClick(e)} />
    </div>
  );
};

export default NavIcon;
