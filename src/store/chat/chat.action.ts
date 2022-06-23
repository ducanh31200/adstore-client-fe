import { State } from ".";

import discountApi from "../../api/discount/discountApi";

import { notifyError, notifySuccess } from "../../utils/notify";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetListDiscount =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await discountApi.list(data);
    if (result.status === 200) {
      setState({ ...getState(), data: result.data.data });

      return true;
    }
    return false;
  };
// export const UpdateDiscount =
//   (data: any) =>
//   async ({ setState, getState }: Actions) => {
//     const result = await discountApi.update(data);
//     if (result.status === 200) {
//       console.log(result);
//       return true;
//     }
//     return false;
//   };
// export const ChangeStatusDiscount =
//   (_id: string, enable: boolean) =>
//   async ({ setState, getState }: Actions) => {
//     const result = await discountApi.update({ _id: _id, enable: !enable });
//     if (result.status === 200) {
//       const newList = [...getState().data].map((item, index) => {
//         if (item._id === _id) item.enable = !enable;
//         return item;
//       });
//       setState({ ...getState(), data: newList });
//       return true;
//     }

//     return false;
//   };
