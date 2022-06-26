import { AnySchema } from "yup";
import { State } from ".";
import cartApi from "../../api/cart/CartAPI";

import categoryApi from "../../api/category/category";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../helper/base.helpers";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetLocalCart =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = getFromLocalStorage("cart");
    console.log("cart", result);
    if (result) {
      setState({
        ...getState(),
        data: result.data,
        count: result.count,
      });
    } else
      setState({
        ...getState(),
        data: undefined,
        count: 0,
      });
  };
export const PushLocalCart =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    saveToLocalStorage("cart", data);
    setState({
      ...getState(),
      data: data.data,
      count: data.count,
    });
  };
