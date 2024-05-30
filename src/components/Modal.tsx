import React from "react";

interface ModalType {
  option: string;
  message: string;
  modalToggle: () => void;
}

const Modal = ({ option, message, modalToggle }: ModalType) => {
  const handleClick = () => {
    modalToggle();
  };

  return (
    <div className="fixed w-[390px] h-screen bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="flex flex-col justify-center bg-white rounded-xl w-3/4 h-1/4 gap-3 z-50">
        <p>{message}</p>
        <div className="flex justify-center gap-4">
          {option && (
            <button
              type="button"
              id="cancel"
              className="btn-cancel"
              onClick={handleClick}
            >
              취소
            </button>
          )}
          <button
            type="button"
            id="confirm"
            className="btn-primary"
            onClick={handleClick}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
