import axiosClient from "../axiosClient";
import { ReturnListReponse, ReturnReponse } from "../response.interface";

const BillApi = {
  create(data: any): Promise<ReturnReponse<{ data: Array<any> }>> {
    const url = "/bill/create";
    return axiosClient.post(url, data);
  },
  calc(data: any): Promise<ReturnReponse<{ data: Array<any> }>> {
    const url = "/bill/billCalc";
    return axiosClient.post(url, data);
  },
  read(): Promise<ReturnReponse<any>> {
    const url = "bill/read";
    return axiosClient.get(url);
  },
  update(data: any): Promise<ReturnReponse<any>> {
    const url = "bill/update";
    return axiosClient.post(url, data);
  },
  list(data: any): Promise<ReturnReponse<any>> {
    const url = "bill/list";
    return axiosClient.post(url, data);
  },
};

export default BillApi;