import { createHook, createStore } from "react-sweet-state";

import { Get, List, SendMessage } from "./chat.action";
import { selector } from "./chat.selector";

export interface Message {
  _id: string;
  isCustomer: boolean;
  message: string;
  createdAt: any;
}
export interface Saler {
  _id: string;
  name: string;
  email: string;
}
export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export type State = {
  data:
    | {
        _id: string;
        seen: boolean;
        messages: Array<Message>;
        saler?: Saler;
        customer?: Customer;
      }
    | undefined;
};

const initialState: State = {
  data: undefined,
};
const actions = {
  Get,
  List,
  SendMessage,
};

const Store = createStore({
  initialState,
  actions,
});

const useChat = createHook(Store, { selector: selector });

export default useChat;
