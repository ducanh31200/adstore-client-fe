import { createHook, createStore } from "react-sweet-state";
import { IProduct } from "../../model/product.model";
import { GetListProduct } from "./product.action";
import { selector } from "./product.selector";

export type State = {
  data: [
    {
      _id: string;
      name: string;
      image_url: string;
      quantity: number;
      category: string;
      code: string;
      enable: boolean;
      price: number;
      sale: number;
      total_rate: number;
    }
  ];
};

const initialState: State = {
  data: [
    {
      _id: "",
      name: "",
      image_url: "",
      quantity: 0,
      category: "",
      code: "",
      enable: true,
      price: 0,
      sale: 0,
      total_rate: 0,
    },
  ],
};

const actions = {
  GetListProduct,
};

const Store = createStore({
  initialState,
  actions,
});

const useProduct = createHook(Store, { selector: selector });

export default useProduct;
