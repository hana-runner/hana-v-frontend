interface LoginType extends Pick<UserInfoType, "username" | "pw"> {}

interface FindIdType extends pick<UserInfoType, "email" | "name"> {}

interface FindPwType
  extends Pick<UserInfoType, "email" | "username" | "name"> {}
