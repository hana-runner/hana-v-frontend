import { VALIDATION } from "./enums";

// VALIDATION ########################

interface ValidationList {
  [VALIDATION.CODE]: boolean;
  [VALIDATION.EMAIL]: boolean;
  [VALIDATION.NAME]: boolean;
  [VALIDATION.USER_ID]: boolean;
  [VALIDATION.USER_PW]: boolean;
}

interface LoginValidation
  extends Pick<ValidationList, VALIDATION.USER_ID | VALIDATION.USER_PW> {}

// VERIFICATION ########################

interface VerificationList {
  [VERIFICATION.CODE]: boolean;
  [VERIFICATION.EMAIL]: boolean;
  [VERIFICATION.NAME]: boolean;
  [VERIFICATION.USER_ID]: boolean;
  [VERIFICATION.USER_PW]: boolean;
  [VERIFICATION.USER_SSN]: boolean;
}

interface RegisterVerification
  extends Pick<
    VerificationList,
    | VERIFICATION.USER_ID
    | VERIFICATION.USER_PW
    | VERIFICATION.CODE
    | VERIFICATION.EMAIL
    | VERIFICATION.NAME
    | VERIFICATION.USER_SSN
  > {}

interface FindIdVerification
  extends Pick<VerificationList, VERIFICATION.EMAIL | VERIFICATION.CODE> {}

interface FindPwVerification
  extends Pick<
    VerificationList,
    VERIFICATION.EMAIL | VERIFICATION.USER_ID | VERIFICATION.CODE
  > {}
