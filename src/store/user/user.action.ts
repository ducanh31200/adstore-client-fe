import { State } from ".";

import discountApi from "../../api/discount/discountApi";
import userApi from "../../api/user/userApi";

import { notifyError, notifySuccess } from "../../utils/notify";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetListUser =
  (data: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await userApi.list(data);
    if (result.status === 200) {
      setState({ ...getState(), data: result.data.data });
      return true;
    }
    return false;
  };

export const ChangeStatusUser =
  (_id: string, enable: boolean) =>
  async ({ setState, getState }: Actions) => {
    const result = await userApi.update({ _id: _id, enable: !enable });
    if (result.status === 200) {
      const newList = [...getState().data].map((item, index) => {
        if (item._id === _id) item.enable = !enable;
        return item;
      });
      setState({ ...getState(), data: newList });
      return true;
    }

    return false;
  };
