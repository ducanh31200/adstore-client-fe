import { createHook, createStore } from "react-sweet-state";
import { string } from "yup";
import { Calc, Create } from "./bill.action";
import { selector } from "./bill.selector";

export interface IBag {
  code: string;
  name: string;
  color: string;
  image_url: string;
  category: string;
  price: number;
  quantity: number;
  colorIndex: number;
  sale: number;
  product: string;
}
export type State = {
  data: {
    bag_details: Array<IBag>;
    discount: number;
    ship: number;
    total: number;
  };
};

const initialState: State = {
  data: {
    bag_details: [
      {
        code: "",
        name: "",
        color: "",
        image_url: "",
        category: "",
        price: 0,
        quantity: 0,
        colorIndex: 0,
        sale: 0,
        product: "",
      },
    ],
    discount: 0,
    ship: 0,
    total: 0,
  },
};
const actions = { Calc, Create };

const Store = createStore({
  initialState,
  actions,
});

const useBill = createHook(Store, { selector: selector });

export default useBill;
