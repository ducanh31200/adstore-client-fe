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

// export const getUserAsync =
//   () =>
//   async ({ setState, getState }: Actions) => {
//     const result = await authApi.getUser();

//     if (result.status === 200) {
//       setState({ ...getState(), isLoggedIn: true, data: result.data });
//       return true;
//     }
//     return false;
//   };
export const getProductCategory =
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
