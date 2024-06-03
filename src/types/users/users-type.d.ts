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
}

interface UserUpdateInfoType
  extends Pick<UserInfoType, "username" | "pw" | "email"> {}

interface UserFindAccountType
  extends Pick<UserInfoType, "username" | "pw" | "email"> {}

interface LoginType extends Pick<UserInfoType, "username" | "pw"> {}

interface FindIdType extends pick<UserInfoType, "email" | "name"> {}

interface FindPwType
  extends Pick<UserInfoType, "email" | "username" | "name"> {}

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
