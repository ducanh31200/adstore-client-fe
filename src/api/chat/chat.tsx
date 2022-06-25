import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const chatApi = {
  new(data: any): Promise<ReturnReponse<any>> {
    const url = "/chat/new";
    return axiosClient.post(url, data);
  },
  getMessage(data: any): Promise<ReturnReponse<any>> {
    const url = "/chat/getMessages";
    return axiosClient.post(url, data);
  },
  send(data: any): Promise<ReturnReponse<any>> {
    const url = "/chat/addMessage";
    return axiosClient.post(url, data);
  },
  list(): Promise<ReturnReponse<any>> {
    const url = "/chat/list";
    return axiosClient.get(url);
  },
};

export default chatApi;
