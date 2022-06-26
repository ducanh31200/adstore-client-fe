import { createHook, createStore } from "react-sweet-state";
import { string } from "yup";
import { GetLocalCart, PushLocalCart } from "./localCart.action";
import { selector } from "./localcart.selector";

export interface Color {
  color: string;
  image_url: string;
}

export type State = {
  data:
    | [
        {
          product: string;
          quantity: number;
          color: string;
        }
      ]
    | undefined;
  count: number;
};

const initialState: State = {
  data: undefined,
  count: 0,
};
const actions = { PushLocalCart, GetLocalCart };

const Store = createStore({
  initialState,
  actions,
});

const useLocalCart = createHook(Store, { selector: selector });

export default useLocalCart;
