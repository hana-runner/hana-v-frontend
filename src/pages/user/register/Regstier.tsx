import React, { useEffect, useReducer } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserWrapper from "../../../components/UserWrapper";
import RegisterId from "./subPages/RegisterId";
import RegisterPw from "./subPages/RegisterPw";
import { RegisterProvider } from "./register-context/context";
import RegisterSSN from "./subPages/RegisterSSN";
import RegisterName from "./subPages/RegisterName";
import RegisterEmail from "./subPages/RegisterEmail";
import VerifyCode from "./subPages/VerifyCode";
import Verified from "./subPages/Verified";

interface CheckList {
  username: boolean;
  userPw: boolean;
  name: boolean;
  userSSN: boolean;
  userEmail: boolean;
  codeVerification: boolean;
}
enum InfoType {
  USER_NAME,
  USER_PW,
  NAME,
  USER_SSN,
  USER_EMAIL,
  CODE_VERIFICATION,
}

interface Action {
  type: InfoType;
}

const defaultCheckList: CheckList = {
  username: false,
  userPw: false,
  name: false,
  userSSN: false,
  userEmail: false,
  codeVerification: false,
};

const reducer = (list: CheckList, { type }: Action) => {
  let newer: CheckList;

  switch (type) {
    case InfoType.USER_NAME:
      newer = { ...list, username: true };
      break;

    case InfoType.USER_PW:
      newer = { ...list, userPw: true };
      break;

    case InfoType.USER_EMAIL:
      newer = { ...list, userEmail: true };
      break;

    case InfoType.NAME:
      newer = { ...list, name: true };
      break;

    case InfoType.USER_SSN:
      newer = { ...list, userSSN: true };
      break;

    case InfoType.CODE_VERIFICATION:
      newer = { ...list, codeVerification: true };
      break;

    default:
      return list;
  }

  return newer;
};

const Register = () => {
  const navigate = useNavigate();
  const [infoList, dispatch] = useReducer(reducer, defaultCheckList);

  useEffect(() => {
    console.log("id", infoList.username);
    console.log("pw", infoList.userPw);
    console.log("name", infoList.name);
  }, [infoList]);

  return (
    <RegisterProvider>
      <UserWrapper hasNav={false}>
        <div className="flex justify-start h-14" onClick={() => navigate(-1)}>
          <IoIosArrowBack size={20} />
        </div>
        {!infoList.username && <RegisterId dispatch={dispatch} />}
        {infoList.username && !infoList.userPw && (
          <RegisterPw dispatch={dispatch} />
        )}
        {infoList.userPw && !infoList.name && (
          <RegisterName dispatch={dispatch} />
        )}
        {infoList.name && !infoList.userSSN && (
          <RegisterSSN dispatch={dispatch} />
        )}
        {infoList.userSSN && !infoList.userEmail && (
          <RegisterEmail dispatch={dispatch} />
        )}
        {infoList.userEmail && !infoList.codeVerification && (
          <VerifyCode dispatch={dispatch} />
        )}
        {infoList.codeVerification && <Verified />}
      </UserWrapper>
    </RegisterProvider>
  );
};

export default Register;
