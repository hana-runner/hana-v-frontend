import React, { useEffect, useRef, useState } from "react";

import { VERIFICATION } from "../../../../types/users/enums";
import validatePw from "../../../../components/users/validation/pw-validation";
import { ActionProp, RegisterAction } from "../../../../types/users/actions";
import { useUserInfo } from "../../../../context/register-context/register-context";

const RegisterPw = ({ dispatch }: ActionProp<RegisterAction>) => {
  const { setUserPw, userInfo } = useUserInfo();
  const pwRef = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrMsg] = useState<string>("");

  const onNext = () => {
    const inputPw = pwRef.current?.value;
    if (!inputPw) {
      setErrMsg("비밀번호를 입력해주세요");
      return;
    }

    if (!validatePw(inputPw)) {
      setErrMsg(
        "비밀번호는 영문자, 기호를 모두 포함하여 8~16자 사이로 작성해 주세요",
      );
      return;
    }

    setUserPw(inputPw);
  };

  useEffect(() => {
    if (userInfo.userPw) {
      dispatch({ type: VERIFICATION.USER_PW });
    }
  }, [userInfo.userPw, dispatch]);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          비밀번호를
          <br />
          입력해주세요
        </h1>
        <div>
          <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full focus:outline-none">
            <input
              className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
              placeholder="비밀번호"
              type="password"
              ref={pwRef}
            />
            <div className="col-span-1">x</div>
          </div>
          <div className="text-start text-hanaRed  text-sm pt-1">
            {errorMsg}
          </div>
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
    </section>
  );
};

export default RegisterPw;
