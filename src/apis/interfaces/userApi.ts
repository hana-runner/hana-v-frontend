import { RegisterType } from "../../types/users/register";

interface userApi {
  register(registerInfo: RegisterType): Promise<BasicApiType>;
  login(loginInfo: LoginType): Promise<CommonResponse>;
}

export default userApi;
