import axiosClient from "../axiosClient";
import { ReturnListReponse, ReturnReponse } from "../response.interface";

const cartApi = {
  push(data: any): Promise<ReturnReponse<{ data: Array<any> }>> {
    const url = "account/pushBag";
    return axiosClient.post(url, data);
  },
  read(): Promise<ReturnReponse<any>> {
    const url = "account/readBag";
    return axiosClient.get(url);
  },
};

export default cartApi;
