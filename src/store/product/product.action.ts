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

export const ChangeStatusProduct =
  (_id: string, enable: boolean) =>
  async ({ setState, getState }: Actions) => {
    const result = await productApi.update({ _id: _id, enable: !enable });
    if (result.status === 200) {
      const newList = [...getState().data].map((item) => {
        if (item._id === _id) item.enable = !enable;
        return item;
      });
      setState({ ...getState(), data: newList });
      return true;
    }
    return false;
  };

export const AddColor =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await productApi.addColor(data);
    if (result.status === 200) {
      const newList = [...getState().data].map((item) => {
        if (item._id === data._id) {
          item.colors.push({ color: data.color, image_url: data.image_base64 });
        }
        return item;
      });
      setState({ ...getState(), data: newList });

      return result.data;
    }
    return false;
  };
