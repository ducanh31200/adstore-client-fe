import { createHook, createStore } from "react-sweet-state";
import { GetCart, PushCart } from "./cart.action";
import { selector } from "./cart.selector";

export type State = {
  data: [
    {
      _id: string;
      quantity: number;
    }
  ];
  count: number;
};

const initialState: State = {
  data: [
    {
      _id: "",
      quantity: 0,
    },
  ],
  count: 0,
};
const actions = { PushCart, GetCart };

const Store = createStore({
  initialState,
  actions,
});

const useCart = createHook(Store, { selector: selector });

export default useCart;
