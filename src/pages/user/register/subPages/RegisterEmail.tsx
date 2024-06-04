import React, { useCallback, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";
import { useUserInfo } from "../../../../components/context/register-context/register-context";

import { EMAIL_DOMAIN, VERIFICATION } from "../../../../types/users/enums";
import { RegisterAction, ActionProp } from "../../../../types/users/actions";
import { EmailRefHandler, EmailType } from "../../../../types/users/users-type";
import ApiClient from "../../../../apis/apiClient";
import EmailInput from "../../../../components/users/EmailInput";
import BlindedInput from "../../../../components/users/BlindedInput";

const RegisterEmail = ({ dispatch }: ActionProp<RegisterAction>) => {
  const { setEmail, userInfo } = useUserInfo();

  const emailRefHandler = useRef<EmailRefHandler>(null);

  const onNext = () => {
    const emailRef = emailRefHandler.current;
    const inputEmail = emailRef?.emailRef.current?.value;
    const inputDomain = emailRef?.domainRef.current?.value;

    if (!inputEmail) {
      emailRef?.setMessage("이메일을 입력해주세요");
      return;
    }

    const email: EmailType = {
      emailId: inputEmail,
      domain: inputDomain as EMAIL_DOMAIN,
    };
    setEmail(email);
  };

  const onEmailSubmit = useCallback(async () => {
    if (userInfo.userEmail.emailId) {
      ApiClient.getInstance().emailVerification(userInfo.userEmail);
      dispatch({ type: VERIFICATION.EMAIL });
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    emailRefHandler.current?.emailRef.current?.focus();
    emailRefHandler.current?.emailRef.current?.click();
  }, []);

  useEffect(() => {
    onEmailSubmit();
  }, [userInfo.userEmail, dispatch, onEmailSubmit]);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-10">
        <h1 className="text-start text-xl">
          이메일주소를
          <br />
          입력해주세요
        </h1>
        <EmailInput ref={emailRefHandler} />
        <div className="flex gap-3 py-1 text-start">
          {/* 회원 주민번호 */}
          <span className="border-b-2 border-b-hanaSilver  text-hanaSilver font-extralight px-2">
            {userInfo.userSSN.split("").map((item) => {
              return `${item} `;
            })}
          </span>
          <span> - </span>
          <span className="flex items-center gap-2 border-b-2 border-b-hanaSilver  text-hanaSilver font-extralight px-2">
            {userInfo.userSSN.at(-1)}
            <BlindedInput length={6} character={<FaCircle />} />
          </span>
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {/* 회원 이름 */}
          {userInfo.name}
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {/* 회원 비밀번호 */}
          <BlindedInput length={userInfo.userPw.length} character="*" />
        </div>
        <div className="border-b-2 border-b-hanaSilver px-2 py-1 text-start text-hanaSilver font-extralight">
          {/* 회원 이름 */}
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
export default RegisterEmail;
