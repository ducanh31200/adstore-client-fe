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
};

export default socialApi;
