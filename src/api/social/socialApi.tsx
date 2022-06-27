import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const socialApi = {
  add(data: any): Promise<ReturnReponse<any>> {
    const url = "/follow/add";
    return axiosClient.post(url, data);
  },
  list(data: any): Promise<ReturnReponse<any>> {
    const url = "/follow/list";
    return axiosClient.post(url, data);
  },
  delete(data: any): Promise<ReturnReponse<any>> {
    const url = "/follow/delete";
    return axiosClient.post(url, data);
  },
  sendMail(data: any): Promise<ReturnReponse<any>> {
    const url = "/emails/send";
    return axiosClient.post(url, data);
  },
  support(data: any): Promise<ReturnReponse<any>> {
    const url = "/comment/add";
    return axiosClient.post(url, data);
  },
};

export default socialApi;
