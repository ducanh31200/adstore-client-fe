import { createHook, createStore } from "react-sweet-state";

import {
  GetListDiscount,
  UpdateDiscount,
  ChangeStatusDiscount,
} from "./discount.action";
import { selector } from "./discount.selector";

export type State = {
  data: [
    {
      _id: string;
      code: string;
      enable: boolean;
      dateStart: string;
      dateEnd: string;
      quantity: number;
      minPrice: number;
      maxPrice: number;
      is_percent: boolean;
      is_ship: boolean;
      is_oid: boolean;
      is_oic: boolean;
      value: number;
    }
  ];
};

const initialState: State = {
  data: [
    {
      _id: "",
      code: "",
      enable: false,
      dateStart: "",
      dateEnd: "",
      quantity: 0,
      minPrice: 0,
      maxPrice: 0,
      is_percent: false,
      is_ship: false,
      is_oid: false,
      is_oic: false,
      value: 0,
    },
  ],
};

const actions = {
  GetListDiscount,
  UpdateDiscount,
  ChangeStatusDiscount,
};

const Store = createStore({
  initialState,
  actions,
});

const useDiscount = createHook(Store, { selector: selector });

export default useDiscount;
