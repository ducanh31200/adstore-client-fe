import { createHook, createStore } from "react-sweet-state";
import {
  loginAsync,
  getUserAsync,
  logoutAsync,
  getOTPAsync,
  signUpAsync,
} from "./auth.action";
import { selector } from "./auth.selector";

export type State = {
  isLoggedIn: boolean;
  data: {
    msg: string;
    data: any;
    accessToken: string;
  };
};

const initialState: State = {
  isLoggedIn: false,
  data: {
    msg: "",
    data: {},
    accessToken: "",
  },
};

const actions = {
  loginAsync,
  getUserAsync,
  logoutAsync,
  getOTPAsync,
  signUpAsync,
};

const Store = createStore({
  initialState,
  actions,
});

const useAuth = createHook(Store, { selector: selector });

export default useAuth;
