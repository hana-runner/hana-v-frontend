import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Menu, MenuElement } from "../components";
import { UserInfoResponseType } from "../types/users/users-type";
import ApiClient from "../apis/apiClient";
import { removeCookie } from "../utils/cookie";

const MenuTab = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const getUserName = async () => {
    const response: UserInfoResponseType =
      await ApiClient.getInstance().getUserInfo();
    setUserName(response.data.name);
  };

  const menus = [
    { path: "myHana", title: "My하나" },
    { path: "transaction", title: "조회" },
    { path: "interests", title: "나의 관심사" },
  ];

  const myHana = [
    { path: "/users/info", title: "내 정보 조회/변경" },
    { path: "/manage_account", title: "내 계좌 관리" },
  ];

  const transaction = [{ path: "/transaction", title: "거래 내역" }];

  const interest = [{ path: "/interests", title: "관심사" }];

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <section>
      <div className="relative flex justify-between items-center w-full h-14 bg-white">
        <div className="flex justify-between items-center w-1/3 mx-4">
          <IoClose
            className="cursor-pointer"
            size={24}
            onClick={() => navigate("/home")}
          />
          <span className="font-hanaBold text-lg pr-5">{userName}님</span>
        </div>
        <div className="flex justify-between items-center w-1/5 mx-4">
          <span
            className="font-hanaMedium text-xs underline cursor-pointer"
            onClick={() => {
              removeCookie("x-access-token", { path: "/" });
              removeCookie("x-auth-token", { path: "/" });
              navigate("/login", { replace: true });
            }}
          >
            로그아웃
          </span>
          <AiOutlineSetting
            className="cursor-pointer"
            size={24}
            onClick={() => navigate("/settings")}
          />
        </div>
      </div>
      <div className="flex">
        <div className="bg-white mt-4 w-[16vw] h-[80vh] rounded-r-2xl shadow-lg">
          <div className="flex flex-col justify-around text-left font-hanaMedium h-1/5 px-5 pt-1">
            {menus.map((menu, index) => (
              <Menu
                title={menu.title}
                key={index}
                isActive={activeMenu === menu.title}
                onClick={() => {
                  setActiveMenu(menu.title);
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-4 mx-6 w-[20vw] h-[80vh] font-hanaRegular text-sm text-left">
          {activeMenu === "My하나" &&
            myHana.map((item, index) => (
              <MenuElement title={item.title} key={index} path={item.path} />
            ))}
          {activeMenu === "조회" &&
            transaction.map((item, index) => (
              <MenuElement title={item.title} key={index} path={item.path} />
            ))}
          {activeMenu === "나의 관심사" &&
            interest.map((item, index) => (
              <MenuElement title={item.title} key={index} path={item.path} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuTab;
