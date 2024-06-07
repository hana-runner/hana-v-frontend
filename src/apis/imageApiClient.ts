import axios from "axios";
import { getCookie } from "../utils/cookie";

const ACCESSTOKEN = getCookie("x-access-token");

class ImageApiClient {
  private static instance: ImageApiClient;

  private axiosInstance;

  constructor() {
    this.axiosInstance = ImageApiClient.createAxiosInstance();
  }

  // 사용자 관심사 추가
  public async addUserInterest(newUserInterest: FormData) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "post",
      url: `/user-interests`,
      data: newUserInterest,
    });

    return response;
  }

  // 사용자 관심 수정
  public async modifyUserInterest(UserInterest: FormData) {
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "put",
      url: `/user-interests`,
      data: UserInterest,
    });

    return response;
  }

  static getInstance(): ImageApiClient {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private static createAxiosInstance = () => {
    const headers = {
      "content-type": "multipart/form-data",
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

        config.headers["Content-Type"] = "multipart/form-data";

        return config;
      },

      (error) => {
        console.log(error);
        const errorStatus = error.response.data.code;
        const errorMessage = error.response.data.message;

        switch (errorStatus) {
          case "IMAGE-001":
            return Promise.reject(new Error(errorMessage));

          default:
            break;
        }
      },
    );

    return newInstance;
  };
}

export default ImageApiClient;
