import { RegisterType } from "../../types/users/register";

interface userApi {
  register(registerInfo: RegisterType): Promise<BasicApiType>;
  login(loginInfo: LoginType): Promise<BasicApiType>;
}

export default userApi;
