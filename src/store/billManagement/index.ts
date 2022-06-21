import { createHook, createStore } from "react-sweet-state";
import { string } from "yup";
import { GetListBill } from "./billManagement.action";
import { selector } from "./billManagement.selector";

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
  data: [{}];
  count: number;
};

const initialState: State = {
  data: [{}],

  count: 0,
};
const actions = { GetListBill };

const Store = createStore({
  initialState,
  actions,
});

const useBillManagement = createHook(Store, { selector: selector });

export default useBillManagement;
