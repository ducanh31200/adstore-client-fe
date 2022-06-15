import { createHook, createStore } from "react-sweet-state";
import { string } from "yup";
import { GetCart, PushCart } from "./cart.action";
import { selector } from "./cart.selector";

export interface Color {
  color: string;
  image_url: string;
}
export interface Product {
  code: string;
  name: string;
  colors: Array<Color>;
  image_url: string;
  price: number;
  sale: number;
  _id: string;
}
export type State = {
  data: [
    {
      _id: string;
      product: Product;
      quantity: number;
      color: string;
    }
  ];
  count: number;
};

const initialState: State = {
  data: [
    {
      _id: "",
      quantity: 0,
      product: {
        code: "",
        name: "",
        colors: [
          {
            color: "",
            image_url: "",
          },
        ],
        image_url: "",
        price: 0,
        sale: 0,
        _id: "",
      },

      color: "",
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
