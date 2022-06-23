import { AnySchema } from "yup";
import { ICategory } from "../../model/category.model";
import axiosClient from "../axiosClient";
import { ReturnListReponse, ReturnReponse } from "../response.interface";

const categoryApi = {
  list(): Promise<ReturnReponse<{ data: Array<ICategory> }>> {
    const url = "category/list";
    return axiosClient.get(url);
  },
  read(data: any): Promise<ReturnReponse<any>> {
    const url = "category/read";
    return axiosClient.post(url, data);
  },
  getProduct(data: any): Promise<ReturnReponse<any>> {
    const url = "category/query"; //params
    return axiosClient.post(url, data);
  },
  create(data: any): Promise<ReturnReponse<any>> {
    const url = "category/create"; //params
    return axiosClient.post(url, data);
  },
  update(data: any): Promise<ReturnReponse<any>> {
    const url = "category/update"; //params
    return axiosClient.post(url, data);
  },
  delete(data: any): Promise<ReturnReponse<any>> {
    const url = "category/delete"; //params
    return axiosClient.post(url, data);
  },
};

export default categoryApi;
