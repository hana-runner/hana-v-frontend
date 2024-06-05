import React from "react";

interface Prop {
  message: string;
}

const Verified = ({ message = "인증 완료" }: Prop) => {
  return (
    <section className="flex flex-col gap-10 h-full py-10">
      <div className="align-middle">{message}</div>
    </section>
  );
};

export default Verified;
