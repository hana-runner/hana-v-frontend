import axios from "axios";
import userApi from "./interfaces/userApi";

import interestApi from "./interfaces/interestApi";
import transactionApi from "./interfaces/transactionApi";

import {
  EmailType,
  LoginType,
  RegisterType,
  UpdatePwType,
  UserUpdateInfoType,
} from "../types/users/users-type";

import { getCookie } from "../utils/cookie";
import accountApi from "./interfaces/accountApi";
import EmailConverter from "../components/users/emailConverter";

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
    const response = await this.axiosInstance.request({
      method: "delete",
      url: "/users/quit",
    });

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

  // 사용자 관심사 삭제
  public async deleteUserInterest(interestId: number) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "delete",
      url: `/user-interests/${interestId}`,
    });

    return response.data;
  }

  // 사용자 관심사별 거래 내역 조회
  public async getUserInterestTransactions(
    interestId: number,
    year: number,
    month: number,
  ) {
    const response = await this.axiosInstance.request<
      ApiResponseType<UserInterestTransactionsType>
    >({
      method: "get",
      url: `/user-interests/transaction/${interestId}?&year=${year}&month=${month}`,
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

  // 관심사 6개월 분석
  public async getTransactionsAnalysisFor6(
    interestId: number,
    year: number,
    month: number,
  ) {
    const response = await this.axiosInstance.request<
      ApiResponseType<TransactionAnalysisFor6Type>
    >({
      method: "get",
      url: `/user-interests/report/${interestId}?year=${year}&month=${month}`,
    });
    return response.data;
  }

  // 카드 정보 가져오기
  public async getCardInfo(interestId: number) {
    const response = await this.axiosInstance.request<
      ApiResponseType<CardType[]>
    >({
      method: "get",
      url: `/user-interests/cards/${interestId}`,
    });
    return response.data;
  }

  // ------------------------------ category

  public static async getCategories(): Promise<CategoryType> {
    const apiUrl = "/categoriesData.json"; // public 디렉토리의 JSON 파일 경로
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }

  public async updateTransactionCategory(
    transactionHistoryId: number,
    categoryId: number,
  ): Promise<BaseResponseType> {
    const response = await this.axiosInstance.request({
      method: "put",
      url: `/transaction-histories/${transactionHistoryId}`,
      data: JSON.stringify({ categoryId: categoryId.toString() }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }

  // ------------------------------ transaction
  // 전체 거래 내역 조회
  public async getTransactions(
    accountId: number,
    option: number,
    sort: boolean,
    start: Date,
    end: Date,
  ): Promise<ApiResponseType<TransactionType[]>> {
    const startDateString = start.toISOString().slice(0, 10);
    const endDateString = end.toISOString().slice(0, 10);
    const response = await this.axiosInstance.request<
      ApiResponseType<TransactionType[]>
    >({
      method: "get",
      url: `/accounts/${accountId}/history?option=${option}&sort=${sort}&start=${startDateString}&end=${endDateString}`,
    });
    return response.data;
  }

  // 단일 거래 조회
  public async getTransactionHistory(
    transactionHistoryId: number,
  ): Promise<TransactionType> {
    const response = await this.axiosInstance.request<TransactionType>({
      method: "get",
      url: `/transaction-histories/${transactionHistoryId}`,
    });
    return response.data;
  }

  // 거래 상세 내역 수정
  public async updateTransactionDetail(
    transactionHistoryId: number,
    interests: { id: number; description: string; amount: number }[],
  ): Promise<TransactionInterestDetail> {
    const response =
      await this.axiosInstance.request<TransactionInterestDetail>({
        method: "post",
        url: `/transaction-history-details/transaction-history/${transactionHistoryId}`,
        data: { interests },
        headers: {
          "Content-Type": "application/json",
        },
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

  // 등록 요청 계좌 유효성 확인
  public async checkAccountNumber(accountInfo: AccountInfoType) {
    const response = await this.axiosInstance.request<
      ApiResponseType<AccountType>
    >({
      method: "post",
      url: "/accounts/check/account-info",
      data: accountInfo,
    });
    return response.data;
  }

  // 계좌 정보 등록 요청
  public async registerAccount(account: AccountType) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "post",
      url: "/accounts",
      data: account,
    });
    return response.data;
  }

  // 등록된 계좌 정보 삭제 요청
  public async deleteAccountInfo(accountId: number) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "delete",
      url: `/account/${accountId}`,
    });
    return response.data;
  }

  // 카테고리별 지출 합계 조회
  public async getExpensePerCategories() {
    const response = await this.axiosInstance.request<
      ApiResponseType<ExpenseType[]>
    >({
      method: "get",
      url: "/accounts/categories",
    });
    return response.data;
  }

  // 카테고리별 지출에 대한 관심사별 지출 내역
  public async getExpensePerInterests() {
    const response = await this.axiosInstance.request<
      ApiResponseType<InterestExpenseType[]>
    >({
      method: "get",
      url: "/transaction-history-details/expenses",
    });
    return response.data;
  }

  // ----------------------------------- notification
  // 알림 수신 여부 업데이트
  public async updateNotiReceive(status: boolean) {
    const response = await this.axiosInstance.request({
      method: "put",
      url: "/users/update/is_receieve_alarm",
      data: { is_receive_alarm: status },
    });
    return response.data;
  }

  // device token 백에 보내기
  public async updateDeviceToken(token: string) {
    const response = await this.axiosInstance.request({
      method: "post",
      url: "/users/alarm/device_token",
      data: { device_token: token },
    });

    return response.data;
  }

  public async getAlarms() {
    const response = await this.axiosInstance.request({
      method: "get",
      url: "/users/alarms",
    });

    return response.data;
  }

  public async fetchAlarms() {
    const response = await this.axiosInstance.request({
      method: "get",
      url: "/users/alarms",
    });

    return response.data;
  }

  public async deleteAlamrs() {
    const response = await this.axiosInstance.request({
      method: "delete",
      url: "users/alarms",
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
        if (getCookie("x-access-token")) {
          config.headers["Authorization"] =
            `Bearer ${getCookie("x-access-token")}`;
        }

        config.headers["Content-Type"] = "application/json";
        return config;
      },

      (error) => {
        console.log(error);
        const errorStatus = error.response.data.code;
        const errorMessage = error.response.data.message;

        switch (errorStatus) {
          case "USERINTEREST-001":
            return Promise.reject(new Error(errorMessage));

          default:
            break;
        }
      },
    );

    return newInstance;
  };
}

export default ApiClient;
