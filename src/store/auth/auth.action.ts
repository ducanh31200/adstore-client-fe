import { State } from ".";
import {
  IReqGetOTP,
  IReqSignIn,
  IReqSignUp,
} from "../../api/auth/auth.interface.req";
import authApi from "../../api/auth/authApi";
import { saveToLocalStorage } from "../../helper/base.helpers";
import { notifyError, notifySuccess } from "../../utils/notify";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const loginAsync =
  (payload: IReqSignIn) =>
  async ({ setState, getState }: Actions) => {
    const result = await authApi.login(payload);
    if (result.status === 200) {
      saveToLocalStorage("accessToken", result.data.accessToken);
      setState({ ...getState(), isLoggedIn: true, data: result.data });
      notifySuccess("Đăng nhập thành công");
      return true;
    }
    notifyError("Sai tài khoản hoặc mật khẩu");
    return false;
  };

export const getUserAsync =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = await authApi.getUser();

    if (result.status === 200) {
      setState({ ...getState(), isLoggedIn: true, data: result.data });
      return true;
    }
    return false;
  };
export const logoutAsync =
  () =>
  ({ setState, getState }: Actions) => {
    localStorage.removeItem("accessToken");
    setState({ ...getState(), isLoggedIn: false });
  };

export const getOTPAsync = (payload: IReqGetOTP) => async () => {
  const result = await authApi.getOTP(payload);
  console.log(result);
  if (result.status === 200) {
    return result.data.msg;
  }
  return false;
};
export const signUpAsync =
  (payload: IReqSignUp) =>
  async ({ setState, getState }: Actions) => {
    const result = await authApi.signup(payload);
    console.log(result);
    if (result.status === 200) {
      setState({ ...getState(), isLoggedIn: true, data: result.data });
      return result.data.msg;
    }
    return false;
  };
