import { AnySchema } from "yup";
import { State } from ".";
import cartApi from "../../api/cart/CartAPI";

import categoryApi from "../../api/category/category";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetCart =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = await cartApi.read();
    if (result.status === 200) {
      // console.log("cart", result);
      setState({
        ...getState(),
        data: result.data.data,
        count: result.data.count,
      });

      return true;
    }
    return false;
  };
export const UpdateCart =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await cartApi.update(data);
    if (result.status === 200) {
      console.log("UpdateCart", result);
      setState({
        ...getState(),
        data: result.data.data,
        count: result.data.count,
      });

      return true;
    }
    return false;
  };
export const PushCart =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await cartApi.push(data);

    if (result.status === 200) {
      return true;
    }
    return false;
  };
