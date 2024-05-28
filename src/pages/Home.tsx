import React, { useState } from "react";
import { Modal } from "../components";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section>
      {openModal && (
        <Modal
          option="confirm"
          message="삭제 하시겠습니까?"
          modalToggle={() => setOpenModal(!openModal)}
        />
      )}
      <div>home</div>
    </section>
  );
};

export default Home;
