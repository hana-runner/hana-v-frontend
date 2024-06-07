import React, { useEffect, useRef, useState } from "react";
import validatePw from "../../../../components/users/validation/pw-validation";
import { useUserInfo } from "../../../../components/context/register-context/register-context";
import {
  SimpleInputRefHandler,
  UpdatePwType,
} from "../../../../types/users/users-type";
import SimpleInput from "../../../../components/users/SimpleInput";
import ApiClient from "../../../../apis/apiClient";
import { ActionProp, FindPwAction } from "../../../../types/users/actions";
import { VERIFICATION } from "../../../../types/users/enums";
import EmailConverter from "../../../../components/users/emailConverter";

const ResetPasswrod = ({ dispatch }: ActionProp<FindPwAction>) => {
  const newPwRef = useRef<SimpleInputRefHandler>(null);
  const newPwConfirmRef = useRef<SimpleInputRefHandler>(null);

  const [newPw, setNewPw] = useState<string>("");
  const [newPwConfirm, setPwConfirm] = useState<string>("");

  const { userInfo } = useUserInfo();

  const onSubmitNewPw = async (pw: string) => {
    try {
      const updateData: UpdatePwType = {
        email: EmailConverter(userInfo.userEmail),
        pw,
      };
      const response: ApiResponseType<string> =
        await ApiClient.getInstance().updatePw(updateData);

      if (response.success) {
        dispatch({ type: VERIFICATION.USER_PW });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onNext = () => {
    const inputPw = newPwRef.current?.inputRef.current?.value;
    const inputConfirm = newPwConfirmRef.current?.inputRef.current?.value;

    if (!inputPw) {
      newPwRef.current?.setMessage("비밀번호를 입력해주세요");
      return;
    }

    if (!validatePw(inputPw)) {
      newPwRef.current?.setMessage("유효하지 않은 비밀번호입니다");
      return;
    }

    setNewPw(inputPw);

    if (!inputConfirm) return;
    setPwConfirm(inputConfirm);

    if (inputPw !== newPwConfirm) {
      newPwConfirmRef.current.setMessage(
        `비밀번호가 일치하지 않습니다  ${newPwConfirm}`,
      );
    }
    onSubmitNewPw(inputPw);
  };

  useEffect(() => {
    newPwRef.current?.inputRef.current?.focus();
    newPwRef.current?.inputRef.current?.click();
  }, []);

  return (
    <section className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          비밀번호를
          <br />
          입력해주세요
        </h1>
        {newPw && (
          // <div>
          //   <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full ">
          //     <input
          //       className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
          //       placeholder="비밀번호 확인"
          //       type="string"
          //       ref={inputConfirmRef}
          //     />
          //     <div className="col-span-1">x</div>
          //   </div>
          //   <div className="text-start text-hanaRed  text-sm pt-1">
          //     {confirmMessage}
          //   </div>
          // </div>
          <SimpleInput ref={newPwConfirmRef} placeHolder="비밀번호 확인" />
        )}

        {/* <div>
          <div
            className={clsx("grid grid-cols-10 border-b-2 w-full", {
              "border-b-hanaGreen": !newPw,
              "border-b-hanaSilver": newPw,
            })}
          >
            <input
              className={clsx(
                "col-span-9 px-2 py-1 bg-transparent focus:outline-none",
                {
                  "text-hanaSilver": !!newPw,
                },
              )}
              placeholder="비밀번호"
              type="string"
              ref={inputRef}
              readOnly={!!newPw}
            />
            {!newPw && <div className="col-span-1">x</div>}
          </div>
          <div className="text-start text-hanaRed  text-sm pt-1">{message}</div>
        </div> */}
        <SimpleInput
          ref={newPwRef}
          placeHolder="새로운 비밀번호"
          readOnly={!!newPw}
          faded={!!newPw}
        />

        <div className="grid grid-cols-11 py-1 text-start text-hanaSilver font-extralight">
          <span className="col-span-5 border-b-2 px-2 border-hanaSilver">
            {userInfo.userEmail.emailId}
          </span>
          <span className="col-span-1">@</span>
          <span className="col-span-5 border-b-2 px-2 border-hanaSilver">
            {userInfo.userEmail.domain}
          </span>
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

export default ResetPasswrod;
