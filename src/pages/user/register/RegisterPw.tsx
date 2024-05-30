import React, { useRef, useState } from "react";
import { Modal } from "../../../components";
import validatePw from "../../../components/common/validation/pw-validation";
import { useUserInfo } from "./context";

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

interface Prop {
  dispatch: React.Dispatch<Action>;
}

const RegisterPw = ({ dispatch }: Prop) => {
  const { setUserPw, userInfo } = useUserInfo();
  const pwRef = useRef<HTMLInputElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [message, setMessage] = useState<string>("");

  const onNext = () => {
    const inputPw = pwRef.current?.value;
    if (!inputPw) {
      setMessage("비밀번호를 입력해주세요");
      setModalOpened(true);
      return;
    }

    setUserPw(inputPw);
    dispatch({ type: InfoType.USER_PW });
  };

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          비밀번호를
          <br />
          입력해주세요
        </h1>
        <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full">
          <input
            className=" col-span-9 px-5 py-1 bg-transparent"
            placeholder="아이디"
            ref={pwRef}
          />
          <div className="col-span-1">x</div>
        </div>
        <div>{userInfo.username}</div>
      </div>
      <button
        type="button"
        className="btn-primary w-full"
        onClick={() => onNext()}
      >
        다음
      </button>

      {modalOpened && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Modal
            message={message}
            option=""
            modalToggle={() => setModalOpened(false)}
          />
        </div>
      )}
    </section>
  );
};

export default RegisterPw;
