<<<<<<< Updated upstream
enum STATUS {
  OK = "ok",
  FAIL = "fail",
}

interface BasicApiType {
=======
interface BaseResponseType {
>>>>>>> Stashed changes
  code: string;
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}
<<<<<<< Updated upstream

interface BasicResultApiType<T> extends Required<BasicApiType> {
=======
interface ApiResponseType<T> extends Required<BasicApiType> {
>>>>>>> Stashed changes
  data: T;
}
