import axios from "axios";
import interestApi from "./interfaces/interestApi";

class ImageApiClient {
  private static instance: ImageApiClient;

  private axiosInstance;

  constructor() {
    this.axiosInstance = ImageApiClient.createAxiosInstance();
  }

  // 사용자 관심사 추가
  public async addUserInterest(newUserInterest: NewUserInterestType) {
    const userId = 1;
    const response = await this.axiosInstance.request<BaseResponseType>({
      method: "post",
      url: `/user-interests/${userId}`,
      data: newUserInterest,
    });

    return response.data;
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
        // eslint-disable-next-line no-param-reassign
        config.headers["Content-Type"] = "multipart/form-data";

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

export default ImageApiClient;
