import React, { useEffect, useReducer } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
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

const defaultCheckList: RegisterVerification = {
  [VERIFICATION.CODE]: false,
  [VERIFICATION.EMAIL]: false,
  [VERIFICATION.NAME]: false,
  [VERIFICATION.USER_ID]: false,
  [VERIFICATION.USER_PW]: false,
  [VERIFICATION.USER_SSN]: false,
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

    default:
      return list;
  }

  return newer;
};

const Register = () => {
  const navigate = useNavigate();
  const [infoList, dispatch] = useReducer(reducer, defaultCheckList);
  const { userInfo, reset } = useUserInfo();

  const onRegister = async (dat: RegisterType) => {
    const res: BaseResponseType = await ApiClient.getInstance().register(dat);
    if (res.code) {
      console.log("로그인 성공");
      reset();
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
      console.log(dat);

      onRegister(dat);
    }
  }, [infoList.code]);

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
      {infoList[VERIFICATION.CODE] && <VerifiedWithPath path="/login" />}
    </UserWrapper>
  );
};

export default Register;
