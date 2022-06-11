import { ICategory } from "../../model/category.model";
import axiosClient from "../axiosClient";
import { ReturnListReponse, ReturnReponse } from "../response.interface";

const categoryApi = {
  list(): Promise<ReturnReponse<{ data: Array<ICategory> }>> {
    const url = "category/list";
    return axiosClient.get(url);
  },
  read(data: any): Promise<ReturnReponse<{ data: any }>> {
    const url = "category/read";
    return axiosClient.post(url, data);
  },
  // signup(data: IReqSignUp): Promise<ReturnReponse<IResLogin>> {
  //   const url = "default/login"; //params
  //   return axiosClient.post(url, data);
  // },
};

export default categoryApi;
