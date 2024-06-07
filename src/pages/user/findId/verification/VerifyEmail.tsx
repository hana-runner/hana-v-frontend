import React, { useEffect, useRef } from "react";
import { EMAIL_DOMAIN, VERIFICATION } from "../../../../types/users/enums";

import { FindIdAction, ActionProp } from "../../../../types/users/actions";
import { EmailRefHandler, EmailType } from "../../../../types/users/users-type";
import EmailInput from "../../../../components/users/EmailInput";
import ApiClient from "../../../../apis/apiClient";
import { useUserInfo } from "../../../../context/register-context/register-context";

const VerifyEmail = ({ dispatch }: ActionProp<FindIdAction>) => {
  const { userInfo, setEmail } = useUserInfo();

  const emailRefHandler = useRef<EmailRefHandler>(null);

  const onEmailSubmit = () => {
    const emailId = emailRefHandler.current?.emailRef.current?.value;
    const domain = emailRefHandler.current?.domainRef.current?.value;

    if (!emailId) {
      emailRefHandler.current?.setMessage("이메일을 입력해주세요");
      return;
    }

    const inputEmail: EmailType = {
      emailId,
      domain: domain as EMAIL_DOMAIN,
    };

    setEmail(inputEmail);
  };

  useEffect(() => {
    if (userInfo.userEmail.emailId) {
      ApiClient.getInstance().emailVerification(userInfo.userEmail);
      dispatch({ type: VERIFICATION.EMAIL });
    }
  }, [userInfo, dispatch]);

  return (
    <section className="flex flex-col h-full justify-between py-10">
      <div className="flex flex-col gap-5">
        <div className="text-xl text-start">
          이메일 주소를
          <br />
          입력해주세요
        </div>
        <EmailInput ref={emailRefHandler} />
      </div>

      <button
        type="button"
        className="bg-white border border-hanaSilver rounded-lg text-hanaSilver w-80 py-2 under"
        onClick={() => onEmailSubmit()}
      >
        다음
      </button>
    </section>
  );
};

export default VerifyEmail;
