import React, { useRef, useState } from "react";
import { Modal } from "../../../components";
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

const RegisterId = ({ dispatch }: Prop) => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const { setUsername } = useUserInfo();

  const onNext = () => {
    const inputId = idRef.current?.value;
    if (!inputId) {
      setModalOpened(true);
      return;
    }

    setUsername(inputId);
    dispatch({ type: InfoType.USER_NAME });
  };
  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          아이디를
          <br />
          입력해주세요
        </h1>
        <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full">
          <input
            className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
            placeholder="아이디"
            ref={idRef}
          />
          <div className="col-span-1">x</div>
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
          <Modal
            message="아이디를 입력해주세요"
            option=""
            modalToggle={() => setModalOpened(false)}
          />
        </div>
      )}
    </section>
  );
};

export default RegisterId;
