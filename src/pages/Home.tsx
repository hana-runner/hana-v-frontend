import React, { useState } from "react";
import {
  MenuCard,
  Modal,
  MonthlyConsumption,
  MyAccount,
  Navbar,
} from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  return (
    <section>
      <Navbar option={false} title="HANA" logo={true} />
      {/* 나의 계좌 */}
      <MyAccount />
      <MonthlyConsumption />
      <MenuCard
        title="나의 관심사"
        description="나의 관심사를 설정하여 비슷한 관심사를 가진 사람들과 소비를 비교해 보아요!"
        color="#BA75CC"
        // 관심사 페이지로 이동
        clickHandler={() => navigate("/")}
      />
      <MenuCard
        title="나의 거래 이력"
        description="나의 거래 이력을 조회하고 소비 내역을 카테고리에 따라 분류해 보아요!"
        color="#757ECC"
        // 거래 내역 조회 페이지로 이동
        clickHandler={() => navigate("/")}
      />
    </section>
  );
};

export default Home;
