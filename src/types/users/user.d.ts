import { EmailType } from "../register";

interface UserInfoType {
  username: string;
  pw: string;
  name: string;
  email: EmailType;
  birthday: Date;
  gender: number;
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
