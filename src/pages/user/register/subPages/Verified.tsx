import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Prop {
  path: string;
}

const Verified = ({ path = "/login" }: Prop) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(path);
    }, 2000);
  }, [navigate, path]);

  return (
    <section className="flex flex-col justify-center h-full">인증 완료</section>
  );
};

export default Verified;
