import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalContextType {
  isModalOpen: boolean;
  modalPath: string;
  modalMessage: string;
  hasOption: boolean;
  openModal: (
    modalPath: string,
    modalMessage: string,
    hasOption?: boolean,
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  modalPath: "",
  modalMessage: "",
  hasOption: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPath, setModalPath] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [hasOption, setHasOption] = useState(false);

  const openModal = (
    modalPath: string,
    modalMessage: string,
    hasOption = false,
  ) => {
    setModalPath(modalPath);
    setModalMessage(modalMessage);
    setHasOption(hasOption);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(modalPath);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalPath,
        modalMessage,
        hasOption,
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
