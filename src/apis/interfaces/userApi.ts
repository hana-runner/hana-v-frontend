import { LoginType, RegisterType } from "../../types/users/users-type";

interface userApi {
  register(registerInfo: RegisterType): Promise<BasicApiType>;
  login(loginInfo: LoginType): Promise<BasicApiType>;
}

export default userApi;
