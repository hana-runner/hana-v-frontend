import React from "react";

const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-4 h-screen bg-white">
      <img src="/img/loading.png" alt="loading" />
      <div className="font-hanaBold text-xs">페이지를 찾을 수 없습니다. </div>
    </section>
  );
};

export default NotFound;
