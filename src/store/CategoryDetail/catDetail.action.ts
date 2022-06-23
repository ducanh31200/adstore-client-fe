import { State } from ".";

import categoryApi from "../../api/category/category";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const ReadCat =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await categoryApi.read(data);
    if (result.status === 200) {
      setState({ ...getState(), data: result.data.data });

      return true;
    }
    return false;
  };

export const setCate =
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
