/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./cookie";
import { Modal } from "../components";

interface Prop {
  children: ReactNode;
}
const RequiredAuth = ({ children }: Prop) => {
  const [accessToken, setAccessToken] = useState(() =>
    getCookie("x-access-token"),
  );

  const [modalOppened, setModalOppened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const navigation = useNavigate();

  const closeModal = () => {
    navigation("/", { replace: true });
  };

  const openModal = (msg: string) => {
    setMessage(msg);
  };

  useEffect(() => {
    console.log("token", accessToken);
    if (!accessToken) {
      navigation("/home");
    }
  }, [accessToken, navigation]);

  return (
    <div>
      {children}
      {modalOppened && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Modal
            message={message}
            option={message === "정말로 탈퇴하시겠습니까?"}
            modalToggle={() => closeModal()}
          />
        </div>
      )}
    </div>
  );
};

export default RequiredAuth;
