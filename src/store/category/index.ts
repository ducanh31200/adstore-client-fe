import { createHook, createStore } from "react-sweet-state";
import { GetListCategory, DeleteCategory } from "./cat.action";
import { selector } from "./cat.selector";

export type State = {
  data: [
    {
      id: number;
      _id: string;
      name: string;
      image_url: string;
      products_length: number;
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
      products_length: 0,
    },
  ],
};

const actions = {
  GetListCategory,
  DeleteCategory,
};

const Store = createStore({
  initialState,
  actions,
});

const useCate = createHook(Store, { selector: selector });

export default useCate;
