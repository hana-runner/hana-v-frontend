// export type CommonAction = { type: InfoType } | { type: VERIFICATION };

import { LOGIN_ACTION } from "./enums";

interface CommonAction<T> {
  type: T;
}

interface LoginAction extends Required<CommonAction<LOGIN_ACTION>> {
  type: LOGIN_ACTION;
}

interface FindIdAction extends Required<CommonAction<"email" | "code">> {
  type: "email" | "code";
}

type Action = LoginAction | FindIdAction;
