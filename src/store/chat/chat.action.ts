import { State } from ".";
import chatApi from "../../api/chat/chat";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const Get =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await chatApi.getMessage(data);
    if (result.status === 200) {
      setState({ ...getState(), data: result.data.data });
      return true;
    }
    return false;
  };
export const List = () => async () => {
  const result = await chatApi.list();
  if (result.status === 200) {
    return result.data.data;
  }
  return false;
};
export const SendMessage = (data: any) => async () => {
  const result = await chatApi.send(data);
  if (result.status === 200) {
    return true;
  }
  return false;
};
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
