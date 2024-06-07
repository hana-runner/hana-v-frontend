import axios from "axios";
import userApi from "./interfaces/userApi";

import interestApi from "./interfaces/interestApi";
import transactionApi from "./interfaces/transactionApi";
import { transactionType } from "../types/transaction";
import { categoryType } from "../types/category";

import {
  EmailType,
  LoginType,
  RegisterType,
  UpdatePwType,
  UserUpdateInfoType,
} from "../types/users/users-type";

import { getCookie, removeCookie, setCookie } from "../utils/cookie";
import accountApi from "./interfaces/accountApi";
import EmailConverter from "../components/users/emailConverter";

const ACCESSTOKEN = getCookie("x-access-token");

class ApiClient implements userApi, interestApi, transactionApi, accountApi {
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

  // ------------------------------ user
  //  회원가입
  public async register(registerInfo: RegisterType): Promise<BaseResponseType> {
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/join",
      data: registerInfo,
    });

    if (!response.data.code) {
      console.log("에러");
    }
    return response.data;
  }

  //  회원가입 - Id 중복체크
  public async idDuplicationCheck(id: string) {
    const response = await this.axiosInstance.request({
      method: "get",
      url: `users/check_dup?username=${id}`,
    });

    return response.data;
  }

  //  회원가입 - 이메일 인증
  public async emailVerification(emailInfo: EmailType) {
    const emailAddress = `${emailInfo.emailId}@${emailInfo.domain}`;

    const response = await this.axiosInstance.request({
      method: "post",
      url: `/emails/authcode?email=${emailAddress}`,
    });

    return response.data;
  }

  //  회원가입 - 인증코드 verification
  public async emailVerificationCode(email: EmailType, inputCode: string) {
    const emailAddress = `${email.emailId}@${email.domain}`;

    const response = await this.axiosInstance.request({
      method: "get",
      url: `/emails/check/authcode?email=${emailAddress}&code=${inputCode}`,
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
  public async findId(email: EmailType) {
    const emailAddress = EmailConverter(email);
    const response = await this.axiosInstance.request({
      method: "get",
      url: `/users/find/username?email=${emailAddress}`,
    });

    return response.data;
  }

  //  로그인 - 비밀번호 재설정
  public async updatePw(updatePwInfo: UpdatePwType) {
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/update/pw",
      data: updatePwInfo,
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
      url: "users/update/email",
      data: userInfo,
    });

    return response.data;
  }

  //  회원 삭제
  public async deleteUser() {
    console.log("회원 삭제 에이피아이 호출");
    const response = await this.axiosInstance.request({
      method: "delete",
      url: "/users/quit",
    });
    console.log("회원 삭제 에이피아이 응답");

    return response.data;
  }

  public async getUserInfo() {
    const response = await this.axiosInstance.request({
      method: "get",
      url: "users/info",
    });

    return response.data;
  }

  // ------------------------------ interest
  // 사용자별 관심사 목록 조회
  public async getUserInterests() {
    const response = await this.axiosInstance.request<
      ApiResponseType<UserInterestType[]>
    >({
      method: "get",
      url: "/user-interests",
    });

    return response.data;
  }

  // 사용자 관심사별 거래 내역 조회
  public async getUserInterestTransactions(
    interestId: string,
    year: number,
    month: number,
  ) {
    const userId = 1;
    const response = await this.axiosInstance.request<
      ApiResponseType<UserInterestTransactionsType>
    >({
      method: "get",
      url: `/user-interests/transaction/${interestId}?userId=${userId}&year=${year}&month=${month}`,
    });

    return response.data;
  }

  // 관심사 목록 가져오기
  public async getInterestList() {
    const response = await this.axiosInstance.request<
      ApiResponseType<InterestType[]>
    >({
      method: "get",
      url: "/interests",
    });

    return response.data;
  }

  // ------------------------------ category

  // ------------------------------ transaction
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

  // ------------------------------ account
  // 사용자 전체 계좌 목록 조회
  public async getAccounts() {
    const response = await this.axiosInstance.request<
      ApiResponseType<AccountType[]>
    >({
      method: "get",
      url: "/accounts",
    });
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
        if (ACCESSTOKEN) {
          config.headers["Authorization"] = `Bearer ${ACCESSTOKEN}`;
        }

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
