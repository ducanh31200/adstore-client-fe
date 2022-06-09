import { ICategory } from "../../model/category.model";
import { IProductCategory } from "../../model/product.model";
import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const productApi = {
  productCategory(
    data: IProductCategory
  ): Promise<ReturnReponse<{ data: Array<ICategory> }>> {
    const url = "category/query";
    return axiosClient.post(url, data);
  },
};

export default productApi;
