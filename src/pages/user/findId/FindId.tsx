import React, { useReducer } from "react";
import VerifyEmail from "./verification/VerifyEmail";
import VerifyCode from "./verification/VerifyCode";
import ShowId from "./ShowId";
import UserWrapper from "../../../components/UserWrapper";
import { FindIdAction } from "../../../types/actions";
import { FindIdVerification } from "../../../types/verification";
import { VERIFICATION } from "../../../types/enums";

const InitialVerificationList: FindIdVerification = {
  [VERIFICATION.EMAIL]: false,
  [VERIFICATION.CODE]: false,
};

const reducer = (list: FindIdVerification, { type }: FindIdAction) => {
  let newer: FindIdVerification;
  switch (type) {
    case VERIFICATION.EMAIL:
      newer = { ...list, [VERIFICATION.EMAIL]: true };
      break;

    case VERIFICATION.CODE:
      newer = { ...list, [VERIFICATION.CODE]: true };
      break;

    default:
      return list;
  }

  return newer;
};
const FindId = () => {
  const [checkList, dispatch] = useReducer(reducer, InitialVerificationList);

  return (
    <UserWrapper hasNav title="아이디 찾기" option logo>
      <div className="h-full">
        {!checkList.email && !checkList.code && (
          <VerifyEmail dispatch={dispatch} />
        )}

        {checkList.email && !checkList.code && (
          <VerifyCode dispatch={dispatch} />
        )}
        {checkList.email && checkList.code && <ShowId />}
      </div>
    </UserWrapper>
  );
};
export default FindId;
