import { EmailType } from "../../types/users/users-type";

const EmailConvert = (emailType: EmailType) => {
  return `${emailType.emailId}@${emailType.domain}`;
};

export default EmailConvert;
