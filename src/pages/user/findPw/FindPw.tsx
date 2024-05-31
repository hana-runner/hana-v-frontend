import React, { useEffect, useReducer, useState } from "react";
import UserWrapper from "../../../components/UserWrapper";
import { FindPwVerification } from "../../../types/verification";
import { VERIFICATION } from "../../../types/enums";
import { FindPwAction } from "../../../types/actions";
import VerifyEmail from "./subPages/VerifyEmail";
import VerifyId from "./subPages/VerifyId";
import VerifyCode from "./subPages/VerifyCode";
import { FindAccountProvider } from "../../../components/context/find-account-context/find-account-context";
import Verified from "../findId/Verified";
import ResetPasswrod from "./subPages/ResetPassword";

const InitialVerificationData: FindPwVerification = {
  [VERIFICATION.CODE]: false,
  [VERIFICATION.EMAIL]: false,
  [VERIFICATION.USER_ID]: false,
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

    default:
      return list;
  }

  return newer;
};

const FindPw = () => {
  const [checkList, dispatch] = useReducer(reducer, InitialVerificationData);
  const [showVerified, setShowVerified] = useState(false);

  useEffect(() => {
    if (checkList.code && checkList.email && checkList.username) {
      setShowVerified(true);
      setTimeout(() => {
        setShowVerified(false);
      }, 2000);
    }
  }, [checkList]);

  return (
    <FindAccountProvider>
      <UserWrapper hasNav title="비밀번호 재설정" option logo>
        <div className=" h-full">
          {!checkList[VERIFICATION.USER_ID] && <VerifyId dispatch={dispatch} />}
          {checkList[VERIFICATION.USER_ID] &&
            !checkList[VERIFICATION.EMAIL] && (
              <VerifyEmail dispatch={dispatch} />
            )}
          {checkList[VERIFICATION.EMAIL] && !checkList[VERIFICATION.CODE] && (
            <VerifyCode dispatch={dispatch} />
          )}
          {checkList[VERIFICATION.CODE] && showVerified && <Verified />}
          {checkList[VERIFICATION.CODE] && !showVerified && <ResetPasswrod />}
        </div>
      </UserWrapper>
    </FindAccountProvider>
  );
};
export default FindPw;
