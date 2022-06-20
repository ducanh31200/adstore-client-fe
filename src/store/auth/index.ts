import { createHook, createStore } from "react-sweet-state";
import {
  loginAsync,
  getUserAsync,
  logoutAsync,
  getOTPAsync,
  signUpAsync,
  changePhoneAsync,
  updateInfoAsync,
} from "./auth.action";
import { selector } from "./auth.selector";

export type State = {
  isLoggedIn: boolean;
  data: {
    msg: string;
    data: any;
    accessToken: string;
    chats: any;
    notifications_length: number;
    bag_items_length: number;
    bills_length: number;
    rate_waits_length: number;
  };
};

const initialState: State = {
  isLoggedIn: false,
  data: {
    msg: "",
    data: {},
    accessToken: "",
    chats: [],
    notifications_length: 0,
    bag_items_length: 10,
    bills_length: 0,
    rate_waits_length: 0,
  },
};

const actions = {
  loginAsync,
  getUserAsync,
  logoutAsync,
  getOTPAsync,
  signUpAsync,
  changePhoneAsync,
  updateInfoAsync,
};

const Store = createStore({
  initialState,
  actions,
});

const useAuth = createHook(Store, { selector: selector });

export default useAuth;
