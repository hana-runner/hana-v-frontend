import React, { useReducer, useState } from "react";
import FindIdEmail from "./FindIdEmail";

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
  const [emailVerified, setVerification] = useState(false);
  const [checkList, dispatch] = useReducer(reducer, InitialVerificationStatus);

  return (
    <section className="flex flex-col justify-evenly items-center h-[100vh] gap-9">
      {!checkList.email && !checkList.code && (
        <FindIdEmail dispatch={dispatch} />
      )}
    </section>
  );
};
export default FindId;
