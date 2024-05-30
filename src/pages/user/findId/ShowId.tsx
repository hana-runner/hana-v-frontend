import React from "react";

const ShowId = () => {
  return (
    <section className="flex flex-col gap-10 w-80 h-80 py-10">
      <h1 className="text-hanaBlack text-lg font-hanaMedium">
        아이디를 찾았어요!
      </h1>
      <div className="bg-hanaSilver bg-hanaSilver bg-opacity-15 rounded-lg text-center text-balance w-80 h-10">
        아이디
      </div>
      <div className="flex flex-col gap-5">
        <button
          type="button"
          className="underline text-hanaSilver font-hanaRegular text-sm underline-offset-2"
        >
          비밀번호 재등록
        </button>
        <button type="button" className="btn-primary">
          로그인
        </button>
      </div>
    </section>
  );
};

export default ShowId;
