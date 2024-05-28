import React, { useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

type LoginAction = {
  type: LOGIN_ACTION;
};

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

const validateId = (id: string) => {
  const pattern = /^[a-zA-Z]+$/;
  return pattern.test(id);
};

const validatePw = (pw: string) => {
  const pattern =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  return pattern.test(pw);
};

const Login = () => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const navigation = useNavigate();

  const [status, dispatch] = useReducer(reducer, InitialLoginInfoStatus);

  const loginHandler = () => {
    const id = idRef.current?.value;
    const pw = pwRef.current?.value;

    if (!id) {
      console.log("아이디를 입력해주세요");
      idRef.current?.focus();
      return;
    }

    if (validateId(id)) {
      dispatch({ type: LOGIN_ACTION.ID_VALIDATE });
    } else {
      console.log("유효하지 않은 아이디");
    }
    if (!pw) {
      console.log("비밀번호를 입력해주세요");
      pwRef.current?.focus();
      return;
    }

    if (validatePw(pw)) {
      dispatch({ type: LOGIN_ACTION.PW_VALIDATE });
    } else {
      console.log("유효하지 않은 비밀번호");
    }

    if (status.userId && status.userPw) {
      console.log("로그인 api");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-[80vh] gap-9">
      <h1 className="text-xl">
        아이디와 비밀번호를
        <br />
        입력해주세요
      </h1>
      <div>
        <span className="flex flex-col gap-4">
          <input
            className="border-2 border-hanaSilver w-80 h-[48px] px-2 rounded-lg focus:outline-none"
            placeholder="아이디"
            ref={idRef}
          />

          <input
            className="border-2 border-hanaSilver w-80 h-[48px] px-2 rounded-lg focus:outline-none"
            placeholder="비밀번호"
            ref={pwRef}
          />
        </span>
      </div>
      <div>
        <button
          type="button"
          className="bg-hanaGreen rounded-lg text-white w-80 py-2"
          onClick={loginHandler}
        >
          로그인
        </button>
      </div>
      <div className="flex gap-4 font-hanaRegular text-hanaSilver underline">
        <button
          type="button"
          className=""
          onClick={() => navigation("/find/id")}
        >
          아이디 찾기
        </button>
        <span className="w-[1px] h-[25px] bg-hanaSilver"> </span>
        <button type="button" onClick={() => navigation("/find/password")}>
          비밀번호 찾기
        </button>
      </div>
    </section>
  );
};

export default Login;
