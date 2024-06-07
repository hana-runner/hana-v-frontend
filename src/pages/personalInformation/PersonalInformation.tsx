/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import UserWrapper from "../../components/UserWrapper";
import ApiClient from "../../apis/apiClient";
import {
  PersonalInfoRefHandler,
  UserInfoResponseType,
  UserInfoType,
} from "../../types/users/users-type";
import PersonalInformationCard from "../../components/users/PersonalInformationCard";
import formatDate from "../../utils/formDate";
import EmailTypeConverter from "../../components/emailTypeConverter";
import { EMAIL_DOMAIN } from "../../types/users/enums";
import EmailConverter from "../../components/users/emailConverter";
import { Modal } from "../../components";
import { removeCookie } from "../../utils/cookie";

interface ShowInfoType
  extends Pick<
    UserInfoType,
    "username" | "email" | "birthday" | "gender" | "ssn"
  > {}

enum TITLE {
  VIEW = "개인정보조회",
  EDIT = "개인정보변경",
}

const PersonalInformation = () => {
  const [title, setTitle] = useState<TITLE>(TITLE.VIEW);
  const [userInfo, setUserInfo] = useState<ShowInfoType | null>(null);
  const [modalOppened, setModalOppened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [resignSuccess, setResignSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const refHandler = useRef<PersonalInfoRefHandler>(null);

  const openModal = (inputmessage: string) => {
    setMessage(inputmessage);
    setModalOppened(true);
  };

  const getInfo = async () => {
    try {
      const response: UserInfoResponseType =
        await ApiClient.getInstance().getUserInfo();

      if (!response.success) return;

      setUserInfo({
        username: response.username,
        email: response.email,
        gender: response.gender === 0 ? 0 : 1,
        birthday: response.birthday,
        ssn: formatDate(response.birthday),
      });
    } catch (err) {
      console.error(err);
      redirect("/");
    }
  };

  const onEdit = () => {
    setTitle(TITLE.EDIT);
  };

  const submitChanges = async () => {
    try {
      const emailId = refHandler.current?.emailIdRef.current?.value;
      const domain: EMAIL_DOMAIN = refHandler.current?.domainRef.current
        ?.value as EMAIL_DOMAIN;

      if (!emailId || !domain) return;

      const response: BaseResponseType =
        await ApiClient.getInstance().updateUserInfo({
          email: EmailConverter({ emailId, domain }),
        });

      if (!response.success) return;
      openModal("변경 되었습니다");
    } catch (err) {
      console.error(err);
    }
  };

  const submitResign = async () => {
    try {
      const response: BaseResponseType =
        await ApiClient.getInstance().deleteUser();

      if (response.success) {
        removeCookie("x-access-token", { path: "/" });
        removeCookie("x-auth-token", { path: "/" });

        setResignSuccess(true);
        openModal("탈퇴 성공");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onResign = () => {
    openModal("정말로 탈퇴하시겠습니까?");
  };

  const closeModal = () => {
    if (message === "정말로 탈퇴하시겠습니까?") {
      submitResign();
      return;
    }
    if (resignSuccess) {
      navigate("/home", { replace: true });
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <UserWrapper hasNav title={title} option>
      <PersonalInformationCard
        ref={refHandler}
        gender={userInfo?.gender}
        email={EmailTypeConverter(userInfo?.email || "")}
        username={userInfo?.username}
        birthday={userInfo?.birthday}
        onEdit={() => onEdit()}
      />
      <button type="button" onClick={() => onResign()}>
        회원 탈퇴
      </button>
      {title === TITLE.EDIT && (
        <button
          type="button"
          className="btn-primary"
          onClick={() => submitChanges()}
        >
          변경
        </button>
      )}
      {modalOppened && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Modal
            message={message}
            option={message === "정말로 탈퇴하시겠습니까?"}
            modalToggle={() => closeModal()}
          />
        </div>
      )}
    </UserWrapper>
  );
};

export default PersonalInformation;
