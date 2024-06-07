import React, { useEffect, useReducer, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { redirect, useNavigate } from "react-router-dom";
import UserWrapper from "../../../components/UserWrapper";
import RegisterId from "./subPages/RegisterId";
import RegisterPw from "./subPages/RegisterPw";
import { useUserInfo } from "../../../components/context/register-context/register-context";
import RegisterSSN from "./subPages/RegisterSSN";
import RegisterName from "./subPages/RegisterName";
import RegisterEmail from "./subPages/RegisterEmail";
import VerifyCode from "./subPages/VerifyCode";

import { VERIFICATION } from "../../../types/users/enums";
import { RegisterAction } from "../../../types/users/actions";
import ApiClient from "../../../apis/apiClient";
import { RegisterType } from "../../../types/users/users-type";
import { RegisterVerification } from "../../../types/users/validate-verify";
import VerifiedWithPath from "../../../components/users/VerifiedWithPath";
import { Modal } from "../../../components";

const defaultCheckList: RegisterVerification = {
  [VERIFICATION.CODE]: false,
  [VERIFICATION.EMAIL]: false,
  [VERIFICATION.NAME]: false,
  [VERIFICATION.USER_ID]: false,
  [VERIFICATION.USER_PW]: false,
  [VERIFICATION.USER_SSN]: false,
  created: false,
};

const reducer = (list: RegisterVerification, { type }: RegisterAction) => {
  let newer: RegisterVerification;

  switch (type) {
    case VERIFICATION.USER_ID:
      newer = { ...list, [VERIFICATION.USER_ID]: true };
      break;

    case VERIFICATION.USER_PW:
      newer = { ...list, [VERIFICATION.USER_PW]: true };
      break;

    case VERIFICATION.EMAIL:
      newer = { ...list, [VERIFICATION.EMAIL]: true };
      break;

    case VERIFICATION.NAME:
      newer = { ...list, [VERIFICATION.NAME]: true };
      break;

    case VERIFICATION.USER_SSN:
      newer = { ...list, [VERIFICATION.USER_SSN]: true };
      break;

    case VERIFICATION.CODE:
      newer = { ...list, [VERIFICATION.CODE]: true };
      break;

    case "created":
      newer = { ...list, created: true };
      break;

    case "clear":
      newer = { ...defaultCheckList };
      break;

    default:
      return list;
  }

  return newer;
};

const Register = () => {
  const navigate = useNavigate();
  const [infoList, dispatch] = useReducer(reducer, defaultCheckList);
  const { userInfo, reset } = useUserInfo();
  const [modalOpened, setModalOppened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const openModal = (msg: string) => {
    setMessage(msg);
    setModalOppened(true);
  };

  const closeModal = () => {
    setModalOppened(false);
    dispatch({ type: "clear" });
    redirect("/register");
  };

  const onRegister = async (dat: RegisterType) => {
    try {
      const res: BaseResponseType = await ApiClient.getInstance().register(dat);
      if (res.success) {
        reset();
        dispatch({ type: "created" });
        return;
      }
      openModal("가입 성공");

      throw new Error(res.message);
    } catch (err: any) {
      if (err.response.data) {
        const messg = err.response.data.message;
        openModal(messg);
      }
    }
  };

  useEffect(() => {
    const dat: RegisterType = {
      username: userInfo.username,
      name: userInfo.name,
      pw: userInfo.userPw,
      gender: Number(userInfo.userSSN.at(-1)) % 2 === 0 ? 0 : 1,
      email: `${userInfo.userEmail.emailId}@${userInfo.userEmail.domain}`,
    };

    if (
      infoList.code &&
      infoList.email &&
      infoList.name &&
      infoList.pw &&
      infoList.ssn &&
      infoList.username
    ) {
      onRegister(dat);
    }
  }, [infoList.code]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <UserWrapper hasNav={false}>
      <div className="flex justify-start h-14" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={20} />
      </div>
      {!infoList[VERIFICATION.USER_ID] && <RegisterId dispatch={dispatch} />}
      {infoList[VERIFICATION.USER_ID] && !infoList[VERIFICATION.USER_PW] && (
        <RegisterPw dispatch={dispatch} />
      )}
      {infoList[VERIFICATION.USER_PW] && !infoList[VERIFICATION.NAME] && (
        <RegisterName dispatch={dispatch} />
      )}
      {infoList[VERIFICATION.NAME] && !infoList[VERIFICATION.USER_SSN] && (
        <RegisterSSN dispatch={dispatch} />
      )}
      {infoList[VERIFICATION.USER_SSN] && !infoList[VERIFICATION.EMAIL] && (
        <RegisterEmail dispatch={dispatch} />
      )}
      {infoList[VERIFICATION.EMAIL] && !infoList[VERIFICATION.CODE] && (
        <VerifyCode dispatch={dispatch} />
      )}
      {infoList[VERIFICATION.CODE] && infoList.created && (
        <VerifiedWithPath message="가입 성공" path="/login" />
      )}
      {modalOpened && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Modal message={message} option={false} modalToggle={closeModal} />
        </div>
      )}
    </UserWrapper>
  );
};

export default Register;
