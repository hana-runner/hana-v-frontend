import React, { useReducer } from "react";
import VerifyEmail from "./verification/VerifyEmail";
import VerifyCode from "./verification/VerifyCode";
import ShowId from "./ShowId";
import UserWrapper from "../../../components/UserWrapper";
import { Action } from "../../../types/actions";

type VerificationList = {
  email: boolean;
  code: boolean;
};

const InitialVerificationStatus: VerificationList = {
  email: false,
  code: false,
};

const reducer = (list: VerificationList, { type }: Action) => {
  let newer: VerificationList;
  switch (type) {
    case "email":
      newer = { ...list, email: true };
      break;

    case "code":
      newer = { ...list, code: true };
      break;

    default:
      return list;
  }

  return newer;
};
const FindId = () => {
  const [checkList, dispatch] = useReducer(reducer, InitialVerificationStatus);

  return (
    <UserWrapper hasNav title="아이디 찾기" option logo>
      <div className="flex h-full">
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
