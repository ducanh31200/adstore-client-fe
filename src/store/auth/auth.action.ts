import { boolean } from "yup";
import { State } from ".";
import {
  IReqChangePhone,
  IReqGetOTP,
  IReqSignIn,
  IReqSignUp,
  IReqUpdateInfo,
} from "../../api/auth/auth.interface.req";
import authApi from "../../api/auth/authApi";
import { saveToLocalStorage } from "../../helper/base.helpers";
import { notifyError, notifySuccess } from "../../utils/notify";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const loginAsync =
  (payload: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await authApi.login(payload);

    if (result.status === 200) {
      saveToLocalStorage("accessToken", result.data.accessToken);
      setState({ ...getState(), isLoggedIn: true });
      notifySuccess("Đăng nhập thành công");
      return result.data;
    }
    notifyError("Sai tài khoản hoặc mật khẩu");
    return result;
  };

export const getUserAsync =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = await authApi.getUser();
    const surface = await authApi.surface();
    if (surface.status === 200) {
      result.data.data.bag_items_length = surface.data.data.bag_items_length;
      result.data.data.notifications_length =
        surface.data.data.notifications_length;
      result.data.data.bag_products = surface.data.data.bag_products;
    }
    if (result.status === 200) {
      setState({ ...getState(), isLoggedIn: true, data: result.data });
      return result.data;
    }
    return false;
  };
export const logoutAsync =
  () =>
  ({ setState, getState }: Actions) => {
    localStorage.removeItem("accessToken");
    setState({ ...getState(), isLoggedIn: false });
    window.location.href = "/";
  };

export const getOTPAsync = (payload: IReqGetOTP) => async () => {
  const result = await authApi.getOTP(payload);
  // console.log(result);
  if (result.status === 200) {
    return result.data.msg;
  }
  return false;
};
export const signUpAsync =
  (payload: IReqSignUp) =>
  async ({ setState, getState }: Actions) => {
    const result = await authApi.signup(payload);
    // console.log(result);
    if (result.status === 200) {
      setState({ ...getState(), isLoggedIn: true, data: result.data });
      return result.data.msg;
    }
    return false;
  };
export const changePhoneAsync = (payload: IReqChangePhone) => async () => {
  const result = await authApi.updatePhone(payload);
  // console.log(result);
  if (result.status === 200) {
    return true;
  }
  return false;
};
export const changePassAsync = (payload: any) => async () => {
  const result = await authApi.updatePassword(payload);
  // console.log(result);
  if (result.status === 200) {
    return true;
  }
  return false;
};
export const updateInfoAsync =
  (payload: IReqUpdateInfo) =>
  async ({ setState, getState }: Actions) => {
    const result = await authApi.updateInfo(payload);
    getUserAsync();
    if (result.status === 200) {
      setState({ ...getState(), change: !getState().change });
      return result.data.msg;
    }
    return false;
  };
