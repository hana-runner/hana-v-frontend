import React, { useRef, useState } from "react";
import { Modal } from "../../../../components";
import { useUserInfo } from "../register-context/context";
import validateId from "../../../../components/validation/id-validation";

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
  const [message, setMessage] = useState<string>("");
  const { setUsername } = useUserInfo();

  const onNext = () => {
    const inputId = idRef.current?.value;
    if (!inputId) {
      setMessage("아이디를 입력해주세요");
      setModalOpened(true);
      return;
    }

    if (!validateId(inputId)) {
      setMessage(
        "유효하지 않은 아이디입니다.\n아이디는 한글, 영문자만 사용하여 작성해주세요",
      );
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
            message={message}
            option=""
            modalToggle={() => setModalOpened(false)}
          />
        </div>
      )}
    </section>
  );
};

export default RegisterId;