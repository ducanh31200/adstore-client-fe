import { State } from ".";

import categoryApi from "../../api/category/category";

type Actions = { setState: any; getState: () => State; dispatch: any };

export const getCategory =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = await categoryApi.list();

    if (result.status === 200) {
      setState({ ...getState(), data: result.data });
      console.log(result.data);
      return true;
    }
    return false;
  };
