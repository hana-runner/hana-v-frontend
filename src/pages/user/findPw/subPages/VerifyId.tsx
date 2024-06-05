import React, { useEffect, useRef } from "react";
import { ActionProp, FindPwAction } from "../../../../types/users/actions";
import { VERIFICATION } from "../../../../types/users/enums";
import validateId from "../../login/validation/id-validation";
import SimpleInput from "../../../../components/users/SimpleInput";
import { SimpleInputRefHandler } from "../../../../types/users/users-type";

const VerifyId = ({ dispatch }: ActionProp<FindPwAction>) => {
  const { userInfo, setUsername } = useFindAccount();

  const inputRef = useRef<SimpleInputRefHandler>(null);

  const onNext = () => {
    const inputId = inputRef.current?.inputRef.current?.value;
    if (!inputId) {
      inputRef.current?.setMessage("아이디를 입력해주세요");
      return;
    }

    if (!validateId(inputId)) {
      inputRef.current.setMessage(
        "아이디는 한글, 영문자만 사용하여 작성해주세요",
      );
      return;
    }

    setUsername(inputId);
  };

  useEffect(() => {
    if (userInfo.username) {
      dispatch({ type: VERIFICATION.USER_ID });
    }
  }, [userInfo.username, dispatch]);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          아이디를
          <br />
          입력해주세요
        </h1>
        <div>
          <SimpleInput ref={inputRef} placeHolder="아이디" />
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

export default VerifyId;
