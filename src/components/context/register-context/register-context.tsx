import React, { ReactNode, createContext, useContext, useReducer } from "react";

import { EMAIL_DOMAIN } from "../../../types/users/enums";
import {
  EmailType,
  UserRegisterInfoType,
} from "../../../types/users/users-type";

interface RegisterContextProp {
  userInfo: UserRegisterInfoType;
  setUsername: (username: string) => void;
  setUserPw: (userPw: string) => void;
  setUserSSN: (ssn: string) => void;
  setName: (name: string) => void;
  setEmail: (email: EmailType) => void;
  reset: () => void;
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
  RESET,
}

type Action =
  | {
      type: ACTION;
      payload: string;
    }
  | { type: ACTION; payload: EmailType }
  | { type: ACTION; payload: null };

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
  reset: () => {},
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
    case ACTION.RESET:
      return defaultUserInfo;

    default:
      return userInfo;
  }
};

export const RegisterProvider = ({ children }: RegisterProviderProp) => {
  const [userInfo, dispatch] = useReducer(reducer, defaultUserInfo);

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

  const reset = () => {
    dispatch({ type: ACTION.RESET, payload: null });
  };

  return (
    <RegisterContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        userInfo,
        setUsername,
        setUserPw,
        setUserSSN,
        setName,
        setEmail,
        reset,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useUserInfo = () => useContext(RegisterContext);
