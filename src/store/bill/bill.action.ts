import { AnySchema } from "yup";
import { State } from ".";
import BillApi from "../../api/cart/BillApi";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const Calc =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
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
    const result = await BillApi.create(data);
    if (result.status === 200) {
      setState({
        ...getState(),
        data: {
          bag_details: [
            {
              code: "",
              name: "",
              color: "",
              image_url: "",
              category: "",
              price: 0,
              quantity: 0,
              colorIndex: 0,
              sale: 0,
              product: "",
            },
          ],
          discount: 0,
          ship: 0,
          total: 0,
        },
      });
      return result.data;
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
