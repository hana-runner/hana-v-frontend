import React, { useEffect, useReducer } from "react";
import VerifyEmail from "./verification/VerifyEmail";
import VerifyCode from "./verification/VerifyCode";
import ShowId from "./ShowId";
import UserWrapper from "../../../components/UserWrapper";
import { FindIdAction } from "../../../types/users/actions";
import { VERIFICATION } from "../../../types/users/enums";
import { FindIdVerification } from "../../../types/users/validate-verify";
import { useUserInfo } from "../../../context/register-context/register-context";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

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
  const navigate = useNavigate();
  const [checkList, dispatch] = useReducer(reducer, InitialVerificationList);
  const { reset } = useUserInfo();

  useEffect(() => {
    reset();
  }, []);

  return (
    <UserWrapper hasNav title="아이디 찾기" option logo>
      <div
        className="flex justify-start h-14"
        onClick={() => navigate("/login")}
      >
        <IoIosArrowBack size={20} />
      </div>
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
