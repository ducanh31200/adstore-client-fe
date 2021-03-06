import { State } from ".";

import categoryApi from "../../api/category/category";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const GetListCategory =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = await categoryApi.list();

    if (result.status === 200) {
      setState({ ...getState(), data: result.data.data });

      return true;
    }
    return false;
  };
export const DeleteCategory =
  (id: any) =>
  async ({ setState, getState }: Actions) => {
    const result = await categoryApi.delete(id);

    if (result.status === 200) {
      const newList = [...getState().data].filter((item) => item._id !== id);
      setState({ ...getState(), data: newList });

      return true;
    }
    return false;
  };
