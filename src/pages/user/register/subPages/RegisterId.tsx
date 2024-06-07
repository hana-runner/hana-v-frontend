import React, { useEffect, useRef, useState } from "react";
import { useUserInfo } from "../../../../components/context/register-context/register-context";
import validateId from "../../../../components/users/validation/id-validation";

import { VERIFICATION } from "../../../../types/users/enums";
import { ActionProp, RegisterAction } from "../../../../types/users/actions";
import ApiClient from "../../../../apis/apiClient";

const RegisterId = ({ dispatch }: ActionProp<RegisterAction>) => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const { setUsername, userInfo } = useUserInfo();
  const [errorMsg, setErrorMsg] = useState("");

  const checkIdDupl = async (id: string) => {
    try {
      const response: BaseResponseType =
        await ApiClient.getInstance().idDuplicationCheck(id);
      if (response.success) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }

    return false;
  };
  const onNext = async () => {
    const inputId = idRef.current?.value;
    if (!inputId) {
      setErrorMsg("아이디를 입력해주세요");
      return;
    }

    if (!validateId(inputId)) {
      setErrorMsg("아이디는 한글, 영문자만 사용하여 작성해주세요");
      return;
    }

    if (!(await checkIdDupl(inputId))) {
      setErrorMsg("이미 존재하는 회원입니다");
      return;
    }
    setUsername(inputId);
    dispatch({ type: VERIFICATION.USER_ID });
  };

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          아이디를
          <br />
          입력해주세요
        </h1>
        <div>
          <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full">
            <input
              className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
              placeholder="아이디"
              ref={idRef}
            />
            <div className="col-span-1">x</div>
          </div>
          <div className="text-hanaRed text-sm text-start pt-1">{errorMsg}</div>
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

export default RegisterId;
