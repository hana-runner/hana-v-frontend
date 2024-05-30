import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verified = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);

  return (
    <section className="flex flex-col justify-center h-full">인증 완료</section>
  );
};

export default Verified;
