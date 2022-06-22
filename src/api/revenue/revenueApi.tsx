import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const revenueApi = {
  check_ship(data: any): Promise<ReturnReponse<any>> {
    const url = "/statistical/check_ship";
    return axiosClient.post(url, data);
  },
  list(data: any): Promise<ReturnReponse<any>> {
    const url = "/statistical";
    return axiosClient.post(url, data);
  },
};

export default revenueApi;
