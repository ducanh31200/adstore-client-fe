import { AnySchema } from "yup";
import { State } from ".";
import BillApi from "../../api/cart/BillApi";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const Calc =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    console.log("data", data);
    const result = await BillApi.calc(data);
    if (result.status === 200) {
      setState({
        ...getState(),
        data: result.data.data,
      });
      return true;
    }
    return false;
  };
export const Create =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    console.log("data-up", data);
    const result = await BillApi.create(data);
    console.log("res", result);
    if (result.status === 200) {
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
