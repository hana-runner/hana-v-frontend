import React from "react";
import { useModal } from "../context/ModalContext";

const Modal = () => {
  const { isModalOpen, modalMessage, hasOption, closeModal } = useModal();

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed w-[390px] h-screen bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="flex flex-col justify-center bg-white rounded-xl w-3/4 h-1/4 gap-3 z-50">
        <p>{modalMessage}</p>
        <div className="flex justify-center gap-4">
          {hasOption && (
            <button
              type="button"
              id="cancel"
              className="btn-cancel"
              onClick={closeModal}
            >
              취소
            </button>
          )}
          <button
            type="button"
            id="confirm"
            className="btn-primary"
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
