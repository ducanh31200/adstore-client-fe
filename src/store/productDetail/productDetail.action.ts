import { State } from ".";

import categoryApi from "../../api/category/category";
import productApi from "../../api/product/productApi";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const ReadProduct =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await productApi.read(data);
    if (result.status === 200) {
      setState({ ...getState(), data: result.data.data });

      return true;
    }
    return false;
  };

export const setProduct =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    setState({ ...getState(), data });
  };
// export const UpdateCat =
//   (id: any) =>
//   async ({ setState, getState }: Actions) => {
//     const result = await categoryApi.delete(id);

//     if (result.status === 200) {
//       const newList = [...getState().data].filter((item) => item._id !== id);
//       setState({ ...getState(), data: newList });

//       return true;
//     }
//     return false;
//   };
