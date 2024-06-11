import React, { useEffect, useReducer, useState } from "react";
import UserWrapper from "../../../components/UserWrapper";
import { VERIFICATION } from "../../../types/users/enums";
import { FindPwAction } from "../../../types/users/actions";
import VerifyEmail from "./subPages/VerifyEmail";
import VerifyId from "./subPages/VerifyId";
import VerifyCode from "./subPages/VerifyCode";
import ResetPasswrod from "./subPages/ResetPassword";
import { FindPwVerification } from "../../../types/users/validate-verify";
import Verified from "../../../components/users/Verified";
import { useUserInfo } from "../../../context/register-context/register-context";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const InitialVerificationData: FindPwVerification = {
  [VERIFICATION.CODE]: false,
  [VERIFICATION.EMAIL]: false,
  [VERIFICATION.USER_ID]: false,
  [VERIFICATION.USER_PW]: false,
};

const reducer = (list: FindPwVerification, { type }: FindPwAction) => {
  let newer: FindPwVerification;
  switch (type) {
    case VERIFICATION.CODE:
      newer = { ...list, [VERIFICATION.CODE]: true };
      break;

    case VERIFICATION.EMAIL:
      newer = { ...list, [VERIFICATION.EMAIL]: true };
      break;

    case VERIFICATION.USER_ID:
      newer = { ...list, [VERIFICATION.USER_ID]: true };
      break;

    case VERIFICATION.USER_PW:
      newer = { ...list, [VERIFICATION.USER_PW]: true };
      break;

    default:
      return list;
  }

  return newer;
};

const FindPw = () => {
  const navigate = useNavigate();
  const [checkList, dispatch] = useReducer(reducer, InitialVerificationData);
  const [showVerified, setShowVerified] = useState(false);
  const { reset } = useUserInfo();

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (checkList.code && checkList.email && checkList.username) {
      setShowVerified(true);
      setTimeout(() => {
        setShowVerified(false);
      }, 2000);
    }
  }, [checkList]);

  return (
    <UserWrapper hasNav title="비밀번호 재설정" option logo>
      <div
        className="flex justify-start h-14"
        onClick={() => navigate("/login")}
      >
        <IoIosArrowBack size={20} />
      </div>
      <div className="mt-10 h-full">
        {!checkList[VERIFICATION.USER_ID] && <VerifyId dispatch={dispatch} />}
        {checkList[VERIFICATION.USER_ID] && !checkList[VERIFICATION.EMAIL] && (
          <VerifyEmail dispatch={dispatch} />
        )}
        {checkList[VERIFICATION.EMAIL] && !checkList[VERIFICATION.CODE] && (
          <VerifyCode dispatch={dispatch} />
        )}
        {checkList[VERIFICATION.CODE] && showVerified && (
          <Verified message="인증 완료" />
        )}
        {checkList[VERIFICATION.CODE] && !showVerified && (
          <ResetPasswrod dispatch={dispatch} />
        )}
      </div>
    </UserWrapper>
  );
};
export default FindPw;
