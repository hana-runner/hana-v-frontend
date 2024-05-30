import { EMAIL_DOMAIN } from "./enums";

interface RegisterType
  extends Pick<UserInfoType, "username" | "pw" | "name" | "email"> {}

interface UserRegisterInfoType {
  username: string;
  userPw: string;
  userSSN: string;
  name: string;
  userEmail: EmailType;
}

interface EmailType {
  emailId: string;
  domain: EMAIL_DOMAIN;
}
