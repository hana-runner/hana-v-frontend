import { VALIDATION } from "./enums";

interface ValidationList {
  [VALIDATION.CODE]: boolean;
  [VALIDATION.EMAIL]: boolean;
  [VALIDATION.NAME]: boolean;
  [VALIDATION.USER_ID]: boolean;
  [VALIDATION.USER_PW]: boolean;
}

interface LoginValidation
  extends Pick<ValidationList, VALIDATION.USER_ID | VALIDATION.USER_PW> {}
