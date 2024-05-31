// export type CommonAction = { type: InfoType } | { type: VERIFICATION };

import { INFO_TYPE, LOGIN_ACTION, VERIFICATION } from "./enums";

interface CommonAction<T> {
  type: T;
}

interface LoginAction extends Required<CommonAction<LOGIN_ACTION>> {
  type: LOGIN_ACTION;
}

interface FindIdAction extends Required<CommonAction<VERIFICATION>> {
  type: VERIFICATION;
}

interface RegisterAction extends Required<CommonAction<INFO_TYPE>> {
  type: INFO_TYPE;
}

// type Action = LoginAction | FindIdAction;

interface ActionProp<T extends CommonAction> {
  dispatch: React.Dispatch<T>;
}
