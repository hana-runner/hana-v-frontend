import React, { useEffect, useRef, useState } from "react";
import { VERIFICATION } from "../../../../types/users/enums";
import { RegisterAction, ActionProp } from "../../../../types/users/actions";
import BlindedInput from "../../../../components/users/BlindedInput";
import { useUserInfo } from "../../../../context/register-context/register-context";

const RegisterName = ({ dispatch }: ActionProp<RegisterAction>) => {
  const { setName, userInfo } = useUserInfo();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<string>("");

  const onNext = () => {
    const inputName = nameRef.current?.value;
    if (!inputName) {
      setMessage("이름을 입력해주세요");
      return;
    }

    setName(inputName);
  };

  useEffect(() => {
    nameRef.current?.focus();
    nameRef.current?.click();
    if (userInfo.name) {
      dispatch({ type: VERIFICATION.NAME });
    }
  }, [userInfo.name, dispatch]);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          이름을
          <br />
          입력해주세요
        </h1>
        <div>
          <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full ">
            <input
              className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
              placeholder="이름"
              type="string"
              ref={nameRef}
            />
            <div className="col-span-1">x</div>
          </div>
          <div className="text-start text-hanaRed  text-sm pt-1">{message}</div>
        </div>

        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          <BlindedInput character="*" length={userInfo.userPw.length} />
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
    </section>
  );
};

export default RegisterName;
