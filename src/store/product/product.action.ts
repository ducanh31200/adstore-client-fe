import { State } from ".";
import {
  IReqGetOTP,
  IReqSignIn,
  IReqSignUp,
} from "../../api/auth/auth.interface.req";
import productApi from "../../api/product/productApi";
import { saveToLocalStorage } from "../../helper/base.helpers";
import { notifyError, notifySuccess } from "../../utils/notify";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetListProduct =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = await productApi.list({});
    if (result.status === 200) {
      setState({ ...getState(), data: result.data.data });

      return true;
    }
    return false;
  };
