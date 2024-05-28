interface RegisterType
  extends Pick<UserInfoType, "username" | "pw" | "name" | "email"> {}

enum EMAIL_DOMAIN {
  GOOGLE = "gmail.com",
  NAVER = "naver.com",
}

interface EmailType {
  emailId: string;
  domain: EMAIL_DOMAIN;
}
