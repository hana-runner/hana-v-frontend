import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { EMAIL_DOMAIN } from "../../types/users/enums";
import { EmailRefHandler } from "../../types/users/users-type";

/* eslint-disable react/react-in-jsx-scope */
const EmailInput = forwardRef((_, ref: ForwardedRef<EmailRefHandler>) => {
  const [message, setMsg] = useState<string>("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const domainRef = useRef<HTMLSelectElement | null>(null);

  const navHandler: EmailRefHandler = {
    setMessage: (msg: string) => setMsg(msg),
    emailRef,
    domainRef,
  };
  useImperativeHandle(ref, () => navHandler);

  return (
    <section>
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
              ref={domainRef}
            >
              <option value={EMAIL_DOMAIN.NAVER} defaultChecked>
                naver.com
              </option>
              <option value={EMAIL_DOMAIN.GOOGLE}>gmail.com</option>
            </select>
          </span>
        </div>
        <div className="text-hanaRed text-start text-sm">{message}</div>
      </div>
    </section>
  );
});

export default EmailInput;
