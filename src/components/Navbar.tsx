import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import NavIcon from "./common/NavIcon";

type NavbarType = {
  title: string;
  option: boolean;
  path?: string;
  logo?: boolean;
};

const Navbar = ({ title, option, path, logo }: NavbarType) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path === "-1") {
      navigate(Number(path));
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="relative flex items-center w-full h-14 bg-white">
      {option && (
        <div
          className="absolute left-5 flex justify-center"
          onClick={handleClick}
        >
          <IoIosArrowBack className="cursor-pointer" size={20} />
        </div>
      )}
      <div className="flex-grow flex justify-center items-center text-center font-hanaMedium">
        {title}
        {logo && (
          <img src="/img/logo1.png" className="size-4 ml-1" alt="logo" />
        )}
      </div>
      <NavIcon />
    </div>
  );
};

export default Navbar;
