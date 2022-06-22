import { createHook, createStore } from "react-sweet-state";
import { ReadProduct, setProduct } from "./productDetail.action";
import { selector } from "./productDetail.selector";

export interface Value {
  _id: string;
  name: string;
  products_length: number;
}
export interface Spec {
  name: string;
  values: Array<Value>;
}

export type State = {
  data:
    | {
        _id: string;
        name: string;
        category: string;
        image_url: string;
        products_length: number;
        specs: Array<Spec>;
      }
    | undefined;
};

const initialState: State = {
  data: undefined,
};

const actions = {
  ReadProduct,
  setProduct,
};

const Store = createStore({
  initialState,
  actions,
});

const useProductDetail = createHook(Store, { selector: selector });

export default useProductDetail;
