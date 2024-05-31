import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import validatePw from "../../../../components/validation/pw-validation";
import { useFindAccount } from "../../../../components/context/find-account-context/find-account-context";

const ResetPasswrod = () => {
  const [message, setMessage] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputConfirmRef = useRef<HTMLInputElement | null>(null);

  const [newPw, setNewPw] = useState<string>("");
  const [newPwConfirm, setPwConfirm] = useState<string>("");

  const { userInfo } = useFindAccount();

  const onNext = () => {
    const inputPw = inputRef.current?.value;
    const inputConfirm = inputConfirmRef.current?.value;

    if (!inputPw) {
      setMessage("비밀번호를 입력해주세요");
      return;
    }

    if (!validatePw(inputPw)) {
      setMessage("유효하지 않은 비밀번호입니다");
      return;
    }

    setNewPw(inputPw);

    if (!inputConfirm) return;
    setPwConfirm(inputConfirm);

    if (inputPw !== newPwConfirm) {
      setConfirmMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    console.log("재등록");
  };

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.click();
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
          <div>
            <div className="grid grid-cols-10 border-b-2 border-hanaGreen w-full ">
              <input
                className=" col-span-9 px-2 py-1 bg-transparent focus:outline-none"
                placeholder="비밀번호 확인"
                type="string"
                ref={inputConfirmRef}
              />
              <div className="col-span-1">x</div>
            </div>
            <div className="text-start text-hanaRed  text-sm pt-1">
              {confirmMessage}
            </div>
          </div>
        )}

        <div>
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
        </div>

        <div className="grid grid-cols-11 py-1 text-start text-hanaSilver font-extralight">
          <span className="col-span-5 border-b-2 px-2 border-hanaSilver">
            {userInfo.email.emailId}
          </span>
          <span className="col-span-1">@</span>
          <span className="col-span-5 border-b-2 px-2 border-hanaSilver">
            {userInfo.email.domain}
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
