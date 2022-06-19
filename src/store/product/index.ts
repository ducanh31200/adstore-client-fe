import { createHook, createStore } from "react-sweet-state";
import { IProduct } from "../../model/product.model";
import {
  GetListProduct,
  AddColor,
  ChangeStatusProduct,
  ImportProduct,
} from "./product.action";
import { selector } from "./product.selector";

export interface Color {
  color: string;
  quantity?: number;
  image_url: string;
}

export type State = {
  data: [
    {
      id: number;
      _id: string;
      name: string;
      image_url: string;
      quantity: number;
      colors: Array<Color>;
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
      id: 0,
      _id: "",
      name: "",
      image_url: "",
      quantity: 0,
      colors: [],
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
  AddColor,
  ChangeStatusProduct,
  ImportProduct,
};

const Store = createStore({
  initialState,
  actions,
});

const useProduct = createHook(Store, { selector: selector });

export default useProduct;
