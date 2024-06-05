import { EmailType } from "../../types/users/users-type";

const EmailConverter = (emailType: EmailType) => {
  return `${emailType.emailId}@${emailType.domain}`;
};

export default EmailConverter;
