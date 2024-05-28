type LoginValidateInfo = {
  userId: boolean;
  userPw: boolean;
};

type LoginType = Pick<UserInfoType, "username" | "pw">;

type FindIdType = Pick<UserInfoType, "email" | "name">;
type FindPwType = Pick<UserInfoType, "email" | "username" | "name">;
