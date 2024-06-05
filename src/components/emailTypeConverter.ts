import { EMAIL_DOMAIN } from "../types/users/enums";
import { EmailType } from "../types/users/users-type";

// const findDomain = (domain: string) => {
//   return Object.keys(EMAIL_DOMAIN).filter((item) => item === domain)[0];
// };
const EmailTypeConverter = (email: string) => {
  const emailVal = email.split("@");
  const emailType: EmailType = {
    emailId: emailVal[0],
    domain: emailVal[1] as EMAIL_DOMAIN,
  };

  return emailType;
};

export default EmailTypeConverter;
