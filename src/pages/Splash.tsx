import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timeout);
  });

  return (
    <section className="flex flex-col justify-center items-center h-screen bg-white">
      <img src="/img/logo2.png" alt="logo2" />
      <div className="font-hanaBold text-5xl">Hana V</div>
      <div className="font-hanaBold text-xs">
        당신의 소비 생활을 더 스마트하게
      </div>
    </section>
  );
};

export default Splash;
