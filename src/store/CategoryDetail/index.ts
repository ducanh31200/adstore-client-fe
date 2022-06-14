import { createHook, createStore } from "react-sweet-state";
import { ISpecs } from "../../model/product.model";
import { ReadCat } from "./catDetail.action";
import { selector } from "./catDetail.selector";

export interface Value {
  _id: string;
  name: string;
  products_length: number;
}
export interface Spec {
  _id: string;
  name: string;
  values: Array<Value>;
}

export type State = {
  data: {
    _id: string;
    name: string;
    image_url: string;
    products_length: number;
    specsModel: Array<Spec>;
  };
};

const initialState: State = {
  data: {
    _id: "",
    name: "",
    image_url: "",
    products_length: 0,
    specsModel: [],
  },
};

const actions = {
  ReadCat,
};

const Store = createStore({
  initialState,
  actions,
});

const useCatDetail = createHook(Store, { selector: selector });

export default useCatDetail;
