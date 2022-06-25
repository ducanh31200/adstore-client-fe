import { createHook, createStore } from "react-sweet-state";

import { GetListFollower } from "./follow.action";
import { selector } from "./follow.selector";

export type State = {
  data: [
    {
      id: number;
      email: string;
    }
  ];
};

const initialState: State = {
  data: [
    {
      id: 0,
      email: "",
    },
  ],
};

const actions = {
  GetListFollower,
};

const Store = createStore({
  initialState,
  actions,
});

const useFollow = createHook(Store, { selector: selector });

export default useFollow;
