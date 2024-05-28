import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import NavIcon from "./common/NavIcon";

type NavbarType = {
  title: string;
  option: boolean;
};

const Navbar = ({ title, option }: NavbarType) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center w-full h-14 bg-white">
      {option && (
        <div
          className="absolute left-5 flex justify-center"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack size={20} />
        </div>
      )}
      <div className="flex-grow text-center">{title}</div>
      <NavIcon />
    </div>
  );
};

export default Navbar;
