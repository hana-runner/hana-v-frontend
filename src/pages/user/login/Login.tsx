import React, { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import validateId from "../../../components/validation/id-validation";
import validatePw from "../../../components/validation/pw-validation";
import UserWrapper from "../../../components/UserWrapper";

const InitialLoginInfoStatus: LoginValidateInfo = {
  userId: false,
  userPw: false,
};

enum LOGIN_ACTION {
  ID_VALIDATE = "id_validate",
  PW_VALIDATE = "pw_validate",
  ID_RESET = "id_reset",
  PW_RESET = "pw_reset",
  RESET = "reset",
}

interface LoginAction {
  type: LOGIN_ACTION;
}

const reducer = (state: LoginValidateInfo, { type }: LoginAction) => {
  let newer: LoginValidateInfo;
  switch (type) {
    case LOGIN_ACTION.ID_VALIDATE:
      newer = { ...state, userId: true };
      break;

    case LOGIN_ACTION.PW_VALIDATE:
      newer = { ...state, userPw: true };
      break;

    case LOGIN_ACTION.PW_RESET:
      newer = { ...state, userPw: false };
      break;

    case LOGIN_ACTION.ID_RESET:
      newer = { ...state, userId: false };
      break;

    case LOGIN_ACTION.RESET:
      newer = { userId: false, userPw: false };
      break;

    default:
      return state;
  }

  return newer;
};

const Login = () => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const [IdErrMsg, setIdErrMsg] = useState<string>("");
  const [PwErrMsg, setPwErrMsg] = useState<string>("");
  const navigation = useNavigate();

  const [status, dispatch] = useReducer(reducer, InitialLoginInfoStatus);

  const loginHandler = () => {
    const id = idRef.current?.value;
    const pw = pwRef.current?.value;

    if (!id) {
      setIdErrMsg("아이디를 입력해주세요");
      idRef.current?.focus();
      return;
    }

    if (validateId(id)) {
      setIdErrMsg("");
      dispatch({ type: LOGIN_ACTION.ID_VALIDATE });
    } else {
      setIdErrMsg("유효하지 않은 아이디입니다");
    }
    if (!pw) {
      setPwErrMsg("비밀번호를 입력해주세요");
      pwRef.current?.focus();
      return;
    }

    if (validatePw(pw)) {
      setPwErrMsg("");
      dispatch({ type: LOGIN_ACTION.PW_VALIDATE });
    } else {
      setPwErrMsg("유효하지 않은 비밀번호입니다");
    }

    if (status.userId && status.userPw) {
      console.log("로그인 api");
    }
  };

  return (
    <UserWrapper hasNav title="로그인" option>
      <div className="flex flex-col gap-20 h-full py-10">
        <div className="flex flex-col gap-10">
          <h1 className="text-xl">
            아이디와 비밀번호를
            <br />
            입력해주세요
          </h1>
          <div>
            <div className="flex flex-col gap-4 text-start">
              <input
                className="border-2 border-hanaSilver w-80 h-[48px] px-2 rounded-lg focus:outline-none"
                placeholder="아이디"
                ref={idRef}
              />
              <div className="text-hanaRed text-sm ">{IdErrMsg}</div>
            </div>
            <div className="flex flex-col gap-2 text-start">
              <input
                className="border-2 border-hanaSilver w-80 h-[48px] px-2 rounded-lg focus:outline-none"
                placeholder="비밀번호"
                ref={pwRef}
              />
              <div className="text-hanaRed text-sm ">{PwErrMsg}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <button
            type="button"
            className="btn-primary w-80 py-2"
            onClick={loginHandler}
          >
            로그인
          </button>
          <div className="flex justify-center gap-4 font-hanaRegular text-hanaSilver text-sm underline">
            <button type="button" onClick={() => navigation("/find/id")}>
              아이디 찾기
            </button>
            <span className="w-[1px] h-[25px] bg-hanaSilver"> </span>
            <button type="button" onClick={() => navigation("/find/password")}>
              비밀번호 찾기
            </button>
            <span className="w-[1px] h-[25px] bg-hanaSilver"> </span>
            <button type="button" onClick={() => navigation("/register")}>
              회원 가입
            </button>
          </div>
        </div>
      </div>
    </UserWrapper>
  );
};

export default Login;
