import { EMAIL_DOMAIN } from "./enums";

// 회원가입 api에 사용
interface RegisterType
  extends Pick<UserInfoType, "username" | "pw" | "name" | "email" | "gender"> {}

// register context에 사용
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
