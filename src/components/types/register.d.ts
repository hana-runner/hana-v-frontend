type RegisterType = Pick<UserInfoType, "username" | "pw" | "name" | "email">;

enum EMAIL_DOMAIN {
  GOOGLE = "gmail.com",
  NAVER = "naver.com",
}

type EmailType = {
  emailId: string;
  domain: EMAIL_DOMAIN;
};
