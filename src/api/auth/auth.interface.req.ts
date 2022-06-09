export interface IReqSignIn {
  email_or_phone: string;
  password: string;
}

export interface IReqSignUp {
  email_or_phone: string;
  password: string;
  code: string;
}
export interface IReqGetOTP {
  email_or_phone: string;
}
