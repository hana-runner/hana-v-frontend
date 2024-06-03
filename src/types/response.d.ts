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

interface BasicApiType<T> {
  code: string;
  data?: T;
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}
