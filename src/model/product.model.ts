export interface IProductCategory {
  name: string;
  specs: Array<ISpecs>;
}
export interface ISpecs {
  name: string;
  value: string;
}
export interface IColors {
  name: string;
  value: string;
}

export interface IProduct {
  quantity: number;
  colors: Array<IColors>;
  enable: boolean;
  _id: string;
  name: string;
  code: string;
  image_url: string;
  category: string;
  desc: string;
  specs: Array<ISpecs>;
  price: number;
  sale: number;
  total_rate: number;
}
