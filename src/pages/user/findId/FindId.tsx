import React, { useReducer } from "react";
import VerifyEmail from "./verification/VerifyEmail";
import VerifyCode from "./verification/VerifyCode";
import ShowId from "./ShowId";
import { Navbar } from "../../../components";

type VerificationList = {
  email: boolean;
  code: boolean;
};

type Action = {
  type: "email" | "code";
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
    <section className="flex flex-col justify-between items-center h-[100vh]">
      <Navbar title="아이디 찾기" option />
      <div className="flex h-full">
        {!checkList.email && !checkList.code && (
          <VerifyEmail dispatch={dispatch} />
        )}

        {checkList.email && !checkList.code && (
          <VerifyCode dispatch={dispatch} />
        )}
        {checkList.email && checkList.code && <ShowId />}
      </div>
    </section>
  );
};
export default FindId;
