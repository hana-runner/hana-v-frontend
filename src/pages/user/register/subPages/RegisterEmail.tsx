import React, { useEffect, useRef, useState } from "react";
import { useUserInfo } from "../../../../components/context/register-context/register-context";
import { Modal } from "../../../../components";

import { EMAIL_DOMAIN, INFO_TYPE } from "../../../../types/enums";
import { EmailType } from "../../../../types/register";
import { RegisterAction, ActionProp } from "../../../../types/actions";

const RegisterEmail = ({ dispatch }: ActionProp<RegisterAction>) => {
  const { setEmail, userInfo } = useUserInfo();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const selectedRef = useRef<HTMLSelectElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [message, setMessage] = useState<string>("");

  const onNext = () => {
    const inputEmail = emailRef.current?.value;
    if (!inputEmail) {
      setMessage("이름을 입력해주세요");
      setModalOpened(true);
      return;
    }

    const email: EmailType = {
      emailId: inputEmail,
      domain: selectedRef.current?.value as EMAIL_DOMAIN,
    };
    setEmail(email);
  };

  useEffect(() => {
    emailRef.current?.focus();
    emailRef.current?.click();

    if (userInfo.userEmail) {
      dispatch({ type: INFO_TYPE.USER_EMAIL });
    }
  }, [userInfo.userEmail, dispatch]);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          이메일주소를
          <br />
          입력해주세요
        </h1>
        <div className="grid grid-cols-12 ">
          <span className="col-span-5 py-1 px-1 border-b-2 border-hanaGreen">
            <input
              className="px-2 bg-transparent focus:outline-none w-full"
              placeholder="이메일주소"
              maxLength={20}
              ref={emailRef}
            />
          </span>
          <span className="col-span-1 py-1">@</span>

          <span className="col-span-6 py-1 px-1 border-b-2 border-hanaGreen">
            <select
              className="bg-transparent focus:outline-none w-full"
              ref={selectedRef}
            >
              <option value={EMAIL_DOMAIN.NAVER} defaultChecked>
                naver.com
              </option>
              <option value={EMAIL_DOMAIN.GOOGLE}>gmail.com</option>
            </select>
          </span>
        </div>
        <div className="flex gap-3 py-1 text-start">
          <span className="border-b-2 border-b-hanaSilver  text-hanaSilver font-extralight px-2">
            {userInfo.userSSN.split("").map((item) => {
              return `${item} `;
            })}
          </span>
          <span> - </span>
          <span className="flex items-center gap-2 border-b-2 border-b-hanaSilver  text-hanaSilver font-extralight px-2">
            {userInfo.userSSN.at(-1)}{" "}
            {Array(6)
              .fill(null)
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className=" bg-hanaBlack rounded-full w-3 h-3 "
                  >
                    {" "}
                  </div>
                );
              })}
          </span>
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {userInfo.name}
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
            option={false}
            modalToggle={() => setModalOpened(false)}
          />
        </div>
      )}
    </section>
  );
};
export default RegisterEmail;
