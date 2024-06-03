interface BaseResponseType {
  code: string;
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}
interface ApiResponseType<T> extends Required<BasicApiType> {
  data: T;
}
