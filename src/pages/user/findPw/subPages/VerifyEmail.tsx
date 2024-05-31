import React, { useEffect, useRef, useState } from "react";
import { EMAIL_DOMAIN, VERIFICATION } from "../../../../types/enums";

import { FindPwAction, ActionProp } from "../../../../types/actions";
import { EmailType } from "../../../../types/register";
import { useFindAccount } from "../../../../components/context/find-account-context/find-account-context";

const VerifyEmail = ({ dispatch }: ActionProp<FindPwAction>) => {
  const { userInfo, setEmail } = useFindAccount();
  const selectedRef = useRef<HTMLSelectElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");

  const onEmailSubmit = () => {
    const emailId = emailRef.current?.value;
    const domain = selectedRef.current?.value;

    if (!emailId) {
      setErrMsg("이메일 아이디를 입력해주세요");
      return;
    }

    const inputEmail: EmailType = {
      emailId,
      domain: domain as EMAIL_DOMAIN,
    };

    setEmail(inputEmail);
  };

  useEffect(() => {
    if (userInfo.email.emailId) {
      dispatch({ type: VERIFICATION.EMAIL });
    }
  }, [userInfo, dispatch]);

  return (
    <section className="h-full">
      <div className="flex flex-col gap-5">
        <div className="text-xl text-start">
          이메일 주소를
          <br />
          입력해주세요
        </div>
        <div>
          <div className="grid grid-cols-12 mb-2">
            <span className="col-span-5">
              <input
                className="border-b-2 border-hanaGreen bg-transparent w-full"
                placeholder="이메일주소"
                ref={emailRef}
              />
            </span>
            <span className="col-span-1">@</span>

            <span className="col-span-6">
              <select
                className="border-b-2 border-hanaGreen bg-transparent focus:outline-none w-full"
                ref={selectedRef}
              >
                <option value={EMAIL_DOMAIN.NAVER} defaultChecked>
                  naver.com
                </option>
                <option value={EMAIL_DOMAIN.GOOGLE}>gmail.com</option>
              </select>
            </span>
          </div>
          <div className="text-hanaRed text-start text-sm">{errMsg}</div>
        </div>
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