export enum EMAIL_DOMAIN {
  GOOGLE = "gmail.com",
  NAVER = "naver.com",
}

export enum LOGIN_INFO_TYPE {
  USER_NAME = "username",
  USER_PW = "pw",
  NAME = "name",
  USER_SSN = "ssn",
  USER_EMAIL = "email",
  CODE_VERIFICATION = "code",
}

export enum VERIFICATION {
  EMAIL = "email",
  CODE = "code",
  USER_ID = "username",
  NAME = "name",
  USER_PW = "pw",
  USER_SSN = "ssn",
}

export enum VALIDATION {
  EMAIL = "email",
  CODE = "code",
  USER_ID = "username",
  NAME = "name",
  USER_PW = "pw",
}

export enum LOGIN_ACTION {
  ID_VALIDATE = "id_validate",
  PW_VALIDATE = "pw_validate",
  ID_RESET = "id_reset",
  PW_RESET = "pw_reset",
  RESET = "reset",
}
