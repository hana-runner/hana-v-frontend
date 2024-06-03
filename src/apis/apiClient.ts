import axios from "axios";
import userApi from "./interfaces/userApi";
import { EmailType, RegisterType } from "../types/users/register";
import interestApi from "./interfaces/interestApi";
import transactionApi from "./interfaces/transactionApi";
import { transactionType } from "../types/transaction";
import { categoryType } from "../types/category";
import accountInfoType from "../types/account";

class ApiClient implements userApi, interestApi, transactionApi {
  // 싱글톤 인스턴스
  private static instance: ApiClient;

  // axios 인스턴스를 저장하는 필드, api 요청을 보낼 때 사용
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
  public async register(registerInfo: BasicApiType) {
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

  // 사용자별 관심사 목록
  public async getUserInterests() {
    const userId = 1;
    const response = await this.axiosInstance.request<userInterestResponseType>(
      {
        method: "get",
        url: `/user-interests/${userId}`,
      },
    );

    return response.data;
  }

  public async getTransactions(): Promise<transactionType> {
    // const accountId = 1;
    const apiUrl = "/transactionListData.json"; // public 디렉토리의 JSON 파일 경로

    const response = await this.axiosInstance.request<transactionType>({
      method: "get",
      url: apiUrl,
      // url: `/accounts/${accountId}`
    });
    return response.data;
  }

  public async getCategories(): Promise<categoryType> {
    const apiUrl = "/categoriesData.json"; // public 디렉토리의 JSON 파일 경로
    const response = await this.axiosInstance.request<categoryType>({
      method: "get",
      url: apiUrl,
    });
    return response.data;
  }

  // 계좌 id별 계좌 정보
  public async getAccounts(): Promise<accountInfoType> {
    // const accountId = 1;
    const apiUrl = "/accountsData.json";
    const response = await this.axiosInstance.request<accountInfoType>(
      {
        method: "get",
        url: apiUrl,
        // url: `/account/${accountId}`
      },
    );
    return response.data;
  }

  /*
  #####################################################
    singleton pattern, creational patterns
  #####################################################
  */

  // 싱글톤 인스턴스 가져오기 - 인스턴스 없을 경우 새로운 인스턴스 생성
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
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        // eslint-disable-next-line no-param-reassign
        config.headers["Content-Type"] = "application/json";

        return config;
      },

      (error) => {
        console.log(error);
        return Promise.reject(error);
      },
    );

    return newInstance;
  };
}

export default ApiClient;
