import { ICategory } from "../../model/category.model";
import { IProductCategory } from "../../model/product.model";
import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const productApi = {
  create(data: any): Promise<ReturnReponse<any>> {
    const url = "product/create";
    return axiosClient.post(url, data);
  },
};

export default productApi;
