import {
  EmailType,
  LoginResponseType,
  LoginType,
  RegisterType,
  UpdatePwType,
  UserInfoResponseType,
  UserUpdateInfoType,
} from "../../types/users/users-type";

interface userApi {
  register(registerInfo: RegisterType): Promise<BaseResponseType>;
  login(loginInfo: LoginType): Promise<ApiResponseType<LoginResponseType>>;
  findId(email: EmailType): Promise<ApiResponseType<string>>;
  updatePw(updatePwInfo: UpdatePwType): Promise<ApiResponseType<string>>;
  idDuplicationCheck(id: string): Promise<BaseResponseType>;
  emailVerification(emailInfo: EmailType): Promise<BaseResponseType>;
  emailVerificationCode(
    email: EmailType,
    inputCode: string,
  ): Promise<BaseResponseType>;

  getUserInfo(): Promise<UserInfoResponseType>;
  updateUserInfo(userInfo: UserUpdateInfoType): Promise<BaseResponseType>;
  deleteUser(): Promise<BaseResponseType>;
}

export default userApi;
