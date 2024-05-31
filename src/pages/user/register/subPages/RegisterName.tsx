import React, { useEffect, useRef, useState } from "react";
import { useUserInfo } from "../register-context/context";
import { Modal } from "../../../../components";

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

const RegisterName = ({ dispatch }: Prop) => {
  const { setName, userInfo } = useUserInfo();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [message, setMessage] = useState<string>("");

  const onNext = () => {
    const inputName = nameRef.current?.value;
    if (!inputName) {
      setMessage("이름을 입력해주세요");
      setModalOpened(true);
      return;
    }

    setName(inputName);
    dispatch({ type: InfoType.NAME });
  };

  useEffect(() => {
    nameRef.current?.focus();
    nameRef.current?.click();
  }, []);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          이름을
          <br />
          입력해주세요
        </h1>
        <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full ">
          <input
            className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
            placeholder="이름"
            type="string"
            ref={nameRef}
          />
          <div className="col-span-1">x</div>
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {Array(userInfo.userPw.length)
            .fill(null)
            .map((item) => {
              return "*";
            })}
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
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

export default RegisterName;
