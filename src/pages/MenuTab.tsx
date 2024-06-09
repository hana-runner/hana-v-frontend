import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Menu, MenuElement } from "../components";

const MenuTab = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    { path: "myHana", title: "My하나" },
    { path: "transaction", title: "조회" },
    { path: "interests", title: "나의 관심사" },
  ];

  const myHana = [
    { path: "/users/info", title: "내 정보 조회/변경" },
    { path: "/accounts/setting", title: "내 계좌 관리" },
  ];

  const transaction = [{ path: "/transaction", title: "거래 내역" }];

  const interest = [{ path: "/interests", title: "관심사" }];

  return (
    <section>
      <div className="relative flex justify-between items-center w-full h-14 bg-white">
        <div className="flex justify-between items-center w-1/3 mx-4">
          <IoClose size={24} onClick={() => navigate("/home")} />
          <span className="font-hanaBold text-lg pr-5">박효리님</span>
        </div>
        <div className="flex justify-between items-center w-1/5 mx-4">
          <span className="font-hanaMedium text-xs underline">로그아웃</span>
          <AiOutlineSetting size={24} />
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
