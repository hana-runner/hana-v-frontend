enum STATUS {
  OK = "ok",
  FAIL = "fail",
}

interface CommonResponse {
  status: STATUS;
  message: string;
}

interface ResultResponse<T> extends Required<CommonResponse> {
  result: T;
}
