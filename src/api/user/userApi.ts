import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const userApi = {
  update(data: any): Promise<ReturnReponse<any>> {
    const url = "/account/enable";
    return axiosClient.post(url, data);
  },
  list(data: any): Promise<ReturnReponse<any>> {
    const url = "/account/list";
    return axiosClient.post(url, data);
  },
  listNotification(data: any): Promise<ReturnReponse<any>> {
    const url = "/account/readNotifications";
    return axiosClient.post(url, data);
  },
  listBills(): Promise<ReturnReponse<any>> {
    const url = "/account/readBills";
    return axiosClient.get(url);
  },
};

export default userApi;
