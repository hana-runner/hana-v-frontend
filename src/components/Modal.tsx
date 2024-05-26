import React from "react";

type ModalType = {
  option: string;
  message: string;
};

const Modal = ({ option, message }: ModalType) => {
  return (
    <div className="h-screen bg-hanaSilver">
      <div>
        <p>{message}</p>
        <div className="">
          {option && <button className="btn-cancel">취소</button>}
          <button className="btn-primary">확인</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
