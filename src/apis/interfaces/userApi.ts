import { RegisterType } from "../../types/users/register";

interface userApi {
  register(registerInfo: RegisterType): Promise<CommonResponse>;
  login(loginInfo: LoginType): Promise<CommonResponse>;
}

export default userApi;
