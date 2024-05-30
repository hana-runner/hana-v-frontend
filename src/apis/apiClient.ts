import axios from "axios";

class ApiClient {
  private static instance: ApiClient;

  private axiosInstance;

  constructor() {
    this.axiosInstance = ApiClient.createAxiosInstance();
  }

  /*
  #####################################################
    member system methods   ex) register, login, logout, ...etc.
  #####################################################
  */

  //  회원가입
  public async register(registerInfo: RegisterType) {
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users",
      data: registerInfo,
    });

    return response.data;
  }

  //  회원가입 - Id 중복체크
  public async idDuplicationCheck(id: string) {
    const response = await this.axiosInstance.request({
      method: "get",
      url: `/users?userId=${id}`,
    });

    return response.data;
  }

  //  회원가입 - 이메일 인증
  public async emailVerification(emailInfo: EmailType) {
    const emailData = { email: `${emailInfo.emailId}@${emailInfo.domain}` };

    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/email",
      data: emailData,
    });

    return response.data;
  }

  //  회원가입 - 인증코드 verification
  public async emailVerificationCode(inputCode: string) {
    const codeData = {
      code: inputCode,
    };
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/email/code",
      data: codeData,
    });

    return response.data;
  }

  // 로그인
  public async login(loginInfo: LoginType) {
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/login",
      data: loginInfo,
    });

    return response.data;
  }

  //  로그인 - 아이디 찾기
  public async findId(findIdInfo: FindIdType) {
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/find/id",
      data: findIdInfo,
    });

    return response.data;
  }

  //  로그인 - 비밀번호 찾기
  public async findPw(findPwInfo: FindPwType) {
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/find/pw",
      data: findPwInfo,
    });

    return response.data;
  }

  //  회원 정보 - 조회
  public async getMemberInfo(userId: string) {
    const response = await this.axiosInstance.request({
      method: "get",
      url: `/users/${userId}`,
    });

    return response.data;
  }

  //  회원 정보 - 수정
  //  ! userId == username !
  public async updateUserInfo(userInfo: UserUpdateInfoType) {
    const response = await this.axiosInstance.request({
      method: "put",
      url: `/users/${userInfo.username}`,
      data: userInfo,
    });

    return response.data;
  }

  //  회원 삭제
  public async deleteUser(userId: string) {
    const response = await this.axiosInstance.request({
      method: "delete",
      url: `/users/${userId}`,
    });

    return response.data;
  }

  /*
  #####################################################
    singleton pattern, creational patterns
  #####################################################
  */
  static getInstance(): ApiClient {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private static createAxiosInstance = () => {
    const headers = {
      "content-type": "application/json",
    };

    const newInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 100000,
      headers,
    });

    return newInstance;
  };
}

export default ApiClient;
