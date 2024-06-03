enum STATUS {
  OK = "ok",
  FAIL = "fail",
}

interface CommonResponse {
  status: STATUS;
  message: string;
  success: boolean;
}

interface ResultResponse<T> extends Required<CommonResponse> {
  result?: T;
}

interface BasicApiType {
  code: string;
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}

interface BasicResultApiType<T> extends Required<BasicApiType> {
  data: T;
}
