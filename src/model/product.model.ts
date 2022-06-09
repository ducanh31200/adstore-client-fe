export interface IProductCategory {
  name: string;
  specs: Array<ISpecs>;
}
export interface ISpecs {
  name: string;
  value: string;
}
export interface IProduct {
  quantity: number;
  enable: boolean;
  _id: string;
  name: string;
  code: string;
  category: string;
  specs: Array<ISpecs>;
  price: number;
  sale: number;
  total_rate: number;
}
