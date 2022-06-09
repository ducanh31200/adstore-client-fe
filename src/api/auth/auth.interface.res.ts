import { string } from "yup";

export interface IResLogin {
  accessToken: string;
  data: {
    email: string;
    notifications_length: number;
    bag_items_length: number;
  };
}
export interface IResGetOTP {
  msg: string;
}
