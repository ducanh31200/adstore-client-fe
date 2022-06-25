import { State } from ".";

import socialApi from "../../api/social/socialApi";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetListFollower =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await socialApi.list(data);
    if (result.status === 200) {
      const arr = result.data.data;
      const newList: any[] = [];
      arr.map((item: any, index: number) => {
        newList.push({ id: index + 1, email: item });
      });
      setState({
        ...getState(),
        data: newList,
      });
      return true;
    }
    return false;
  };

// export const ChangeStatusUser =
//   (_id: string, enable: boolean) =>
//   async ({ setState, getState }: Actions) => {
//     const result = await userApi.update({ _id: _id, enable: !enable });
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
