import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalContextType {
  isModalOpen: boolean;
  modalPath: string;
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
  modalPath: "",
  modalMessage: "",
  hasOption: false,
  onConfirm: () => {},
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPath, setModalPath] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [hasOption, setHasOption] = useState(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const openModal = (
    modalPath: string,
    modalMessage: string,
    onConfirm: () => void,
    hasOption = false,
  ) => {
    setModalPath(modalPath);
    setModalMessage(modalMessage);
    setHasOption(hasOption);
    setOnConfirm(() => onConfirm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalPath) {
      navigate(modalPath);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalPath,
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
