import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  modalMessage: string;
  hasOption: boolean;
  onConfirm: () => void;
  openModal: (
    modalMessage: string,
    modalPath?: string,
    onConfirm?: () => void,
    hasOption?: boolean,
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  modalMessage: "",
  hasOption: false,
  onConfirm: () => {},
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [hasOption, setHasOption] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => {});

  const openModal = (
    modalMessage: string,
    onConfirm: () => void,
    hasOption = false,
  ) => {
    setModalMessage(modalMessage);
    setHasOption(hasOption);
    if (onConfirm) {
      setOnConfirm(() => onConfirm);
    } else {
      setOnConfirm(() => {});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalMessage,
        hasOption,
        onConfirm,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
