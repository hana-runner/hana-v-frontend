import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { EMAIL_DOMAIN } from "../../../types/enums";
import { UserRegisterInfoType, EmailType } from "../../../types/register";

interface RegisterContextProp {
  userInfo: UserRegisterInfoType;
  setUsername: (username: string) => void;
  setUserPw: (userPw: string) => void;
  setUserSSN: (ssn: string) => void;
  setName: (name: string) => void;
  setEmail: (email: EmailType) => void;
}

interface RegisterProviderProp {
  children: ReactNode;
}

enum ACTION {
  SET_ID,
  SET_NAME,
  SET_PW,
  SET_SSN,
  SET_EMAIL,
}

type Action =
  | {
      type: ACTION;
      payload: string;
    }
  | { type: ACTION; payload: EmailType };

const defaultUserInfo: UserRegisterInfoType = {
  username: "",
  userPw: "",
  userSSN: "",
  name: "",
  userEmail: { emailId: "", domain: EMAIL_DOMAIN.NAVER },
};

const defaultContext: RegisterContextProp = {
  userInfo: defaultUserInfo,
  setUsername: (username: string) => {},
  setUserPw: (userPw: string) => {},
  setUserSSN: (ssn: string) => {},
  setName: (name: string) => {},
  setEmail: (email: EmailType) => {},
};

const RegisterContext = createContext<RegisterContextProp>(defaultContext);

const reducer = (userInfo: UserRegisterInfoType, action: Action) => {
  switch (action.type) {
    case ACTION.SET_ID:
      return { ...userInfo, username: action.payload as string };
    case ACTION.SET_NAME:
      return { ...userInfo, name: action.payload as string };
    case ACTION.SET_PW:
      return { ...userInfo, userPw: action.payload as string };
    case ACTION.SET_SSN:
      return { ...userInfo, userSSN: action.payload as string };
    case ACTION.SET_EMAIL:
      return { ...userInfo, userEmail: action.payload as EmailType };
    default:
      return userInfo;
  }
};

export const RegisterProvider = ({ children }: RegisterProviderProp) => {
  const [userRegisterInfo, dispatch] = useReducer(reducer, defaultUserInfo);

  const value = useMemo(() => {
    const setUsername = (username: string) => {
      dispatch({ type: ACTION.SET_ID, payload: username });
    };

    const setUserPw = (userPw: string) => {
      dispatch({ type: ACTION.SET_PW, payload: userPw });
    };

    const setUserSSN = (userSSN: string) => {
      dispatch({ type: ACTION.SET_SSN, payload: userSSN });
    };

    const setName = (name: string) => {
      dispatch({ type: ACTION.SET_NAME, payload: name });
    };

    const setEmail = (email: EmailType) => {
      dispatch({ type: ACTION.SET_EMAIL, payload: email });
    };

    return {
      userInfo: userRegisterInfo,
      setUsername,
      setUserPw,
      setUserSSN,
      setName,
      setEmail,
    };
  }, [userRegisterInfo]);

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useUserInfo = () => useContext(RegisterContext);
