import { createHook, createStore } from "react-sweet-state";
import { ISpecs } from "../../model/product.model";
import { ReadCat, setCate } from "./catDetail.action";
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
  data:
    | {
        _id: string;
        name: string;
        image_url: string;
        products_length: number;
        specsModel: Array<Spec>;
      }
    | undefined;
};

const initialState: State = {
  data: undefined,
};

const actions = {
  ReadCat,
  setCate,
};

const Store = createStore({
  initialState,
  actions,
});

const useCatDetail = createHook(Store, { selector: selector });

export default useCatDetail;
