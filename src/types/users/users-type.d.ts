import { RefObject } from "react";
import { EMAIL_DOMAIN } from "./enums";

// User 관련 정보 전체
interface UserInfoType {
  username: string;
  pw: string;
  name: string;
  email: string;
  birthday: Date;
  gender: 0 | 1;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  is_receive_email;
  is_receive_alarm;
  ssn: string;
}

interface UserUpdateInfoType extends Pick<UserInfoType, "email"> {}

interface UserFindAccountType
  extends Pick<UserInfoType, "username" | "pw" | "email"> {}

interface LoginType extends Pick<UserInfoType, "username" | "pw"> {}

interface FindIdType extends pick<UserInfoType, "email"> {}

interface UpdatePwType extends Pick<UserInfoType, "email" | "pw"> {}

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

// 이메일 타입
interface EmailType {
  emailId: string;
  domain: EMAIL_DOMAIN;
}

// EmailInput 타입 관련
interface EmailRefHandler {
  setMessage: (msg: string) => void;
  emailRef: React.RefObject<HTMLInputElement | null>;
  domainRef: React.RefObject<HTMLSelectElement | null>;
}

interface SimpleInputRefHandler {
  setMessage: (msg: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

interface LoginResponseType extends Required<BaseResponseType> {
  accessToken: string;
  refreshToken: string;
}

interface UserInfoResponseType extends BaseResponseType {
  birthday: Date;
  email: string;
  gender: number;
  username: string;
}

interface PersonalInfoRefHandler {
  emailIdRef: RefObject<HTMLInputElement>;
  domainRef: RefObject<HTMLSelectElement>;
  edit: () => void;
}
