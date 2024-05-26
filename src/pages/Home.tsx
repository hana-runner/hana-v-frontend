import React from "react";
import { Modal } from "../components";

const Home = () => {
  return (
    <section>
      <div>home</div>
      <Modal option="confirm" message="삭제 하시겠습니까?" />
    </section>
  );
};

export default Home;
