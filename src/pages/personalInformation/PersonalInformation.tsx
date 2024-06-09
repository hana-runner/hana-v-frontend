/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserWrapper from "../../components/UserWrapper";
import ApiClient from "../../apis/apiClient";
import {
  PersonalInfoRefHandler,
  UserInfoResponseType,
  UserInfoType,
} from "../../types/users/users-type";
import PersonalInformationCard from "../../components/users/PersonalInformationCard";
import EmailTypeConverter from "../../components/emailTypeConverter";
import { EMAIL_DOMAIN } from "../../types/users/enums";
import EmailConverter from "../../components/users/emailConverter";
import { getCookie, removeCookie } from "../../utils/cookie";
import formatDate from "../../utils/formDate";
import Logout from "../../components/users/Logout";

interface ShowInfoType
  extends Pick<
    UserInfoType,
    "name" | "email" | "birthday" | "gender" | "ssn"
  > {}

enum TITLE {
  VIEW = "개인정보조회",
  EDIT = "개인정보변경",
}

const PersonalInformation = () => {
  const [title, setTitle] = useState<TITLE>(TITLE.VIEW);
  const [userInfo, setUserInfo] = useState<ShowInfoType | null>(null);
  const [modalOpen, setModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [hasOption, setHasOption] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [idDel, setDel] = useState<boolean>(false);
  const navigate = useNavigate();

  const refHandler = useRef<PersonalInfoRefHandler>(null);

  const openMyModal = (msg: string) => {
    setModalMessage(msg);
    setModal(true);
  };

  const getInfo = async () => {
    try {
      const response: UserInfoResponseType =
        await ApiClient.getInstance().getUserInfo();

      if (!response.success) return;
      console.log(response);

      setUserInfo({
        name: response.data.name,
        email: response.data.email,
        gender: response.data.gender === 0 ? 0 : 1,
        birthday: response.data.birthday,
        ssn: formatDate(response.data.birthday),
      });
    } catch (err) {
      console.error(err);
      navigate("/", { replace: true });
    }
  };

  const onDecline = () => {
    setHasOption(false);
    setModal(false);
  };

  const onResign = () => {
    console.log("onRes");
    setConfirm(true);
    setHasOption(true);
    openMyModal("정말로 탈퇴하시겠습니까?");
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
      openMyModal("변경 되었습니다");
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

        setDel(true);
        openMyModal("탈퇴 성공");
      }
    } catch (err) {
      console.error(err);
      openMyModal("탈퇴 실패");
    }
  };

  const closeModal = async () => {
    if (idDel) {
      navigate("/home", { replace: true });
    }
    setModal(false);
    setHasOption(false);

    if (!isConfirm) return;
    try {
      const res: BaseResponseType = await submitResign();
      if (res.success) {
        navigate("/home");
      }
    } catch (err) {
      setConfirm(false);
      setHasOption(false);
    }
  };

  const handleConfirm = () => {
    closeModal();
  };

  const onEdit = () => {
    setTitle(TITLE.EDIT);
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
        name={userInfo?.name}
        birthday={userInfo?.birthday}
        onEdit={() => onEdit()}
      />
      {getCookie("token") && <Logout className="btn-primary}" />}
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
      {modalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="fixed w-[390px] h-screen bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white rounded-xl w-3/4 h-1/4 gap-3 z-50">
              <p>{modalMessage}</p>
              <div className="flex justify-center gap-4">
                {hasOption && (
                  <button
                    type="button"
                    id="cancel"
                    className="btn-cancel"
                    onClick={onDecline}
                  >
                    취소
                  </button>
                )}
                <button
                  type="button"
                  id="confirm"
                  className="btn-primary"
                  onClick={handleConfirm}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserWrapper>
  );
};

export default PersonalInformation;
