import {
  EmailType,
  LoginResponseType,
  LoginType,
  RegisterType,
  UpdatePwType,
} from "../../types/users/users-type";

interface userApi {
  register(registerInfo: RegisterType): Promise<BaseResponseType>;
  login(loginInfo: LoginType): Promise<ApiResponseType<LoginResponseType>>;
  findId(email: EmailType): Promise<ApiResponseType<string>>;
  updatePw(updatePwInfo: UpdatePwType): Promise<ApiResponseType<string>>;
  emailVerification(emailInfo: EmailType): Promise<BaseResponseType>;
  emailVerificationCode(
    email: EmailType,
    inputCode: string,
  ): Promise<BaseResponseType>;
}

export default userApi;
