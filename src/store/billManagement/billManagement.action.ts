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
// export const UpdateCart =
//   (data: any) =>
//   async ({ setState, getState }: Actions) => {
//     const result = await cartApi.update(data);
//     if (result.status === 200) {
//       console.log("UpdateCart", result);
//       setState({
//         ...getState(),
//         data: result.data.data,
//         count: result.data.count,
//       });

//       return true;
//     }
//     return false;
//   };
