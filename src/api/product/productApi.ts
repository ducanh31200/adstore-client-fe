import { ICategory } from "../../model/category.model";
import { IProductCategory } from "../../model/product.model";
import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const productApi = {
  create(data: any): Promise<ReturnReponse<any>> {
    const url = "product/create";
    return axiosClient.post(url, data);
  },
  list(data: any): Promise<ReturnReponse<any>> {
    const url = "product/list";
    return axiosClient.post(url, data);
  },
  update(data: any): Promise<ReturnReponse<any>> {
    const url = "product/update";
    return axiosClient.post(url, data);
  },
  read(data: any): Promise<ReturnReponse<any>> {
    const url = "product/read";
    return axiosClient.post(url, data);
  },
  comment(data: any): Promise<ReturnReponse<any>> {
    const url = "product/readComments";
    return axiosClient.post(url, data);
  },
  addColor(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/addColor";
    return axiosClient.post(url, data);
  },
  updateColor(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/updateColor";
    return axiosClient.post(url, data);
  },
  addCarousel(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/addCatalogue";
    return axiosClient.post(url, data);
  },
  import(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/imports";
    return axiosClient.post(url, data);
  },
  rate(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/rate";
    return axiosClient.post(url, data);
  },
  hint(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/hint";
    return axiosClient.post(url, data);
  },
  top(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/top";
    return axiosClient.post(url, data);
  },
  comingSoon(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/commingSoon";
    return axiosClient.post(url, data);
  },
  listCarousel(data: any): Promise<ReturnReponse<any>> {
    const url = "/product/sale";
    return axiosClient.post(url, data);
  },
};

export default productApi;
