// import { ADMIN_MODEL, USER_MODEL } from "../../models/user.model";
import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";
import { IReqSignIn, IReqSignUp, IReqGetOTP } from "./auth.interface.req";
import { IResGetOTP, IResLogin } from "./auth.interface.res";

const authApi = {
  login(data: IReqSignIn): Promise<ReturnReponse<IResLogin>> {
    const url = "default/login"; //params

    return axiosClient.post(url, data);
  },
  getUser(): Promise<ReturnReponse<any>> {
    const url = "default/info"; //params
    return axiosClient.get(url);
  },
  getOTP(data: IReqGetOTP): Promise<ReturnReponse<IResGetOTP>> {
    const url = "default/otp";
    return axiosClient.post(url, data);
  },
  signup(data: IReqSignUp): Promise<ReturnReponse<any>> {
    const url = "default/signUp";
    return axiosClient.post(url, data);
  },
};

export default authApi;
