import { createHook, createStore } from "react-sweet-state";

import { GetListUser, ChangeStatusUser } from "./user.action";
import { selector } from "./user.selector";

export type State = {
  data: [
    {
      address: {
        province: string;
        district: string;
        address: string;
      };
      _id: string;
      email: string;
      name: string;
      birth: string;
      gender: string;
      role: string;
      self_cancel: 0;
      enable: boolean;
      phone: string;
    }
  ];
};

const initialState: State = {
  data: [
    {
      address: {
        province: "",
        district: "",
        address: "",
      },
      _id: "",
      email: "",
      name: " ",
      birth: "",
      gender: "",
      role: "",
      self_cancel: 0,
      enable: true,

      phone: "",
    },
  ],
};

const actions = {
  GetListUser,
  ChangeStatusUser,
};

const Store = createStore({
  initialState,
  actions,
});

const useUser = createHook(Store, { selector: selector });

export default useUser;
