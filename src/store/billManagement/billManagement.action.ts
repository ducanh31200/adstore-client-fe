import { AnySchema } from "yup";
import { State } from ".";
import BillApi from "../../api/cart/BillApi";
import cartApi from "../../api/cart/CartAPI";

import categoryApi from "../../api/category/category";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetListBill =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await BillApi.list(data);
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
export const UpdateBill =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await BillApi.update(data);
    if (result.status === 200) {
      const newList = [...getState().data].map((item: any) => {
        if (item._id === data._id) item.status = data.status;
        return item;
      });
      setState({ ...getState(), data: newList });
      return true;

      return true;
    }
    return false;
  };
