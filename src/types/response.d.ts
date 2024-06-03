enum STATUS {
  OK = "ok",
  FAIL = "fail",
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
