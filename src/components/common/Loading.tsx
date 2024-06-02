import React from "react";

const Loading = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-4 h-screen bg-white">
      <img src="/img/loading.png" alt="loading" />
      <div className="font-hanaBold text-xs">잠시만 기다려주세요</div>
    </section>
  );
};

export default Loading;
