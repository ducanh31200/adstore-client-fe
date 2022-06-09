import { createHook, createStore } from "react-sweet-state";
import { IProduct } from "../../model/product.model";
import { getProductCategory } from "./product.action";
import { selector } from "./product.selector";

export type State = {
  data: Array<IProduct>;
  total: number;
};

const initialState: State = {
  data: [],
  total: 0,
};

const actions = {
  getProductCategory,
};

const Store = createStore({
  initialState,
  actions,
});

const useProduct = createHook(Store, { selector: selector });

export default useProduct;
