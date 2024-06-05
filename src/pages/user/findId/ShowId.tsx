import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../context/register-context/register-context";

const ShowId = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  useEffect(() => {}, [userInfo]);
  return (
    <section className="flex flex-col gap-10 py-10">
      <h1 className="text-hanaBlack text-lg font-hanaMedium">
        아이디를 찾았어요!
      </h1>
      <div className="bg-hanaSilver bg-opacity-15 rounded-lg text-center text-balance w-80 h-10">
        {userInfo.username}
      </div>
      <div className="flex flex-col gap-5">
        <button
          type="button"
          className="underline text-hanaSilver font-hanaRegular text-sm underline-offset-2"
          onClick={() => navigate("")}
        >
          비밀번호 재등록
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
      </div>
    </section>
  );
};

export default ShowId;
