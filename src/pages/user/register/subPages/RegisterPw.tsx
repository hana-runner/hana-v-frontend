import React, { useRef, useState } from "react";
import { Modal } from "../../../../components";

import { useUserInfo } from "../register-context/context";
import { InfoType } from "../../../../types/enums";
import validatePw from "../../../../components/validation/pw-validation";

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

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const onNext = () => {
    const inputPw = pwRef.current?.value;
    if (!inputPw) {
      setMessage("비밀번호를 입력해주세요");
      openModal();
      return;
    }

    if (!validatePw(inputPw)) {
      setMessage(
        "비밀번호는 영문자, 기호를 모두 포함하여 8~16자 사이로 작성해 주세요",
      );
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
        <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full focus:outline-none">
          <input
            className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
            placeholder="비밀번호"
            type="password"
            ref={pwRef}
          />
          <div className="col-span-1">x</div>
        </div>
        <div className="border-b-2 border-b-hanaSilver text-hanaSilver px-2 py-1 text-start font-ha">
          {userInfo.username}
        </div>
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
          <Modal message={message} option="" modalToggle={closeModal} />
        </div>
      )}
    </section>
  );
};

export default RegisterPw;
