import { VERIFICATION } from "./enums";

// interface VerificatioList<T extends VERIFICATION[keyof typeof VERIFICATION]> {
//   [K in T]: boolean;
//   [key: string]: boolean;
// }

// interface FindIdVerificationList
//   extends VerificatioList<VERIFICATION.EMAIL | VERIFICATION.CODE> {}

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
