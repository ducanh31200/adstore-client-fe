export interface IReqSignIn {
  email_or_phone: string;
  password: string;
}

export interface IReqSignUp {
  email_or_phone: string;
  password: string;
  code: string;
}
export interface IReqUpdateInfo {
  name: string;
  birth: Date;
  gender: boolean;
  address: {
    province: string;
    district: string;
    address: string;
  };
}
export interface IReqChangePhone {
  phone: string;
  code: string;
}
export interface IReqGetOTP {
  email_or_phone: string;
}
