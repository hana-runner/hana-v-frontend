import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { EmailType } from "../../../types/register";
import { UserFindAccountType } from "../../../types/user";
import { EMAIL_DOMAIN } from "../../../types/enums";

interface FindAccountContextProp {
  userInfo: UserFindAccountType;
  setUsername: (username: string) => void;
  setUserPw: (userPw: string) => void;
  setEmail: (email: EmailType) => void;
}

interface FindAccountProviderProp {
  children: ReactNode;
}

enum ACTION {
  SET_ID = "username",
  SET_PW = "pw",
  SET_EMAIL = "email",
}

type Action =
  | { type: ACTION.SET_ID | ACTION.SET_PW; payload: string }
  | { type: ACTION.SET_EMAIL; payload: EmailType };

const defaultAccountInfo: FindAccountContextProp = {
  userInfo: {
    username: "",
    pw: "",
    email: { emailId: "", domain: EMAIL_DOMAIN.NAVER },
  },
  setUsername: (id: string) => {},
  setUserPw: (pw: string) => {},
  setEmail: (email: EmailType) => {},
};

const defaultInfo: UserFindAccountType = {
  username: "",
  pw: "",
  email: { emailId: "", domain: EMAIL_DOMAIN.NAVER },
};

const FindAccountContext =
  createContext<FindAccountContextProp>(defaultAccountInfo);

const reducer = (status: UserFindAccountType, { type, payload }: Action) => {
  let newer: UserFindAccountType;
  switch (type) {
    case ACTION.SET_ID:
      newer = { ...status, [ACTION.SET_ID]: payload };
      break;

    case ACTION.SET_PW:
      newer = { ...status, [ACTION.SET_PW]: payload };
      break;

    case ACTION.SET_EMAIL:
      newer = { ...status, email: payload as EmailType };
      break;

    default:
      return status;
  }

  return newer;
};

export const FindAccountProvider = ({ children }: FindAccountProviderProp) => {
  const [accountInfo, dispatch] = useReducer(reducer, defaultInfo);
  const value = useMemo(() => {
    const setUsername = (id: string) => {
      console.log("hihi", id);
      if (id) dispatch({ type: ACTION.SET_ID, payload: id });
    };

    const setUserPw = (pw: string) => {
      if (pw) dispatch({ type: ACTION.SET_PW, payload: pw });
    };

    const setEmail = (email: EmailType) => {
      if (email.emailId) {
        dispatch({ type: ACTION.SET_EMAIL, payload: email });
      }
    };

    return { userInfo: accountInfo, setUsername, setUserPw, setEmail };
  }, [accountInfo]);

  return (
    <FindAccountContext.Provider value={value}>
      {children}
    </FindAccountContext.Provider>
  );
};

export const useFindAccount = () => useContext(FindAccountContext);
