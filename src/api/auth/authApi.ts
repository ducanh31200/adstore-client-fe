// import { ADMIN_MODEL, USER_MODEL } from "../../models/user.model";
import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";
import {
  IReqSignIn,
  IReqSignUp,
  IReqGetOTP,
  IReqChangePhone,
  IReqUpdateInfo,
} from "./auth.interface.req";
import { IResGetOTP, IResLogin } from "./auth.interface.res";

const authApi = {
  login(data: IReqSignIn): Promise<ReturnReponse<any>> {
    const url = "account/login"; //params
    return axiosClient.post(url, data);
  },
  getUser(): Promise<ReturnReponse<any>> {
    const url = "account/info"; //params
    return axiosClient.get(url);
  },
  surface(): Promise<ReturnReponse<any>> {
    const url = "account/surface";
    return axiosClient.get(url);
  },
  getOTP(data: IReqGetOTP): Promise<ReturnReponse<IResGetOTP>> {
    const url = "account/otp";
    return axiosClient.post(url, data);
  },
  signup(data: IReqSignUp): Promise<ReturnReponse<any>> {
    const url = "account/signUp";
    return axiosClient.post(url, data);
  },
  updatePhone(data: IReqChangePhone): Promise<ReturnReponse<any>> {
    const url = "account/updatePhone";
    return axiosClient.post(url, data);
  },
  updatePassword(data: IReqChangePhone): Promise<ReturnReponse<any>> {
    const url = "account/updatePassword";
    return axiosClient.post(url, data);
  },
  updateInfo(data: IReqUpdateInfo): Promise<ReturnReponse<any>> {
    const url = "account/updateInfo";
    return axiosClient.post(url, data);
  },
};

export default authApi;
