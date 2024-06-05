import React, { forwardRef } from "react";
import { EmailType } from "../../types/users/users-type";
import EmailTypeConverter from "../emailTypeConverter";
import { EMAIL_DOMAIN } from "../../types/users/enums";

interface Prop {
  section: string;
  value: string;
  readOnly: boolean;
}

const PersonalInfo = forwardRef(({ section, value, readOnly = true }: Prop) => {
  const isEmail = (inputValue: string) => {
    if (inputValue.includes("@")) return true;
    return false;
  };

  const email: EmailType | null = isEmail(value)
    ? EmailTypeConverter(value)
    : null;

  return (
    <section>
      {isEmail(value) ? (
        <>
          <input value={email?.emailId || ""} readOnly={readOnly} /> @{" "}
          <select
            className="border-b-2 border-hanaGreen bg-transparent focus:outline-none w-full"
            ref={domainRef}
            disabled={readOnly}
          >
            <option value={EMAIL_DOMAIN.NAVER} defaultChecked>
              naver.com
            </option>
            <option value={EMAIL_DOMAIN.GOOGLE}>gmail.com</option>
          </select>{" "}
        </>
      ) : (
        <input value={value} readOnly={readOnly} />
      )}
    </section>
  );
});

export default PersonalInfo;
