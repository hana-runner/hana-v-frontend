export enum InfoType {
  USER_NAME,
  USER_PW,
  NAME,
  USER_SSN,
  USER_EMAIL,
  CODE_VERIFICATION,
}

export enum VERIFICATION {
  EMAIL = "email",
  CODE = "code",
}

export type CommonAction = { type: InfoType } | { type: VERIFICATION };
