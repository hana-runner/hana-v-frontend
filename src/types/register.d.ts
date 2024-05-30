interface RegisterType
  extends Pick<UserInfoType, "username" | "pw" | "name" | "email"> {}

interface UserRegisterInfoType {
  username: string;
  userPw: string;
  userSSN: string;
  name: string;
  userEmail: EmailType;
}

enum EMAIL_DOMAIN {
  GOOGLE = "gmail.com",
  NAVER = "naver.com",
}

interface EmailType {
  emailId: string;
  domain: EMAIL_DOMAIN;
}
