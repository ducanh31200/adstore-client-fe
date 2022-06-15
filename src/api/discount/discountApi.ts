import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const discountApi = {
  create(data: any): Promise<ReturnReponse<{ data: Array<any> }>> {
    const url = "/discount/create";
    return axiosClient.post(url, data);
  },
  update(data: any): Promise<ReturnReponse<any>> {
    const url = "/discount/update";
    return axiosClient.post(url, data);
  },
};

export default discountApi;
