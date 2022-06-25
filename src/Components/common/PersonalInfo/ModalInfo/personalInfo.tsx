import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../../store/auth";
import { notifyError, notifySuccess } from "../../../../utils/notify";

interface Props {
  closeModal: () => void;
}

const ModalInfo = (props: Props) => {
  const { closeModal } = props;
  const { register, handleSubmit } = useForm();
  const [editState, setEditState] = useState(true);
  const [authState, actionAuth] = useAuth();
  const [phoneOTP, setPhoneOTP] = useState(false);
  const [emailOTP, setEmailOTP] = useState(false);
  let formatPhone = "0";

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    if (data.name === "") data.name = authState.data.data.name;
    if (data.birth === "") data.birth = authState.data.data.birth;
    if (data.gender === "") data.gender = authState.data.data.gender;
    if (data.province === "")
      data.province = authState.data.data.address.province;
    if (data.district === "")
      data.district = authState.data.data.address.district;
    if (data.address === "") data.address = authState.data.data.address.address;
    const address = {
      province: data.province,
      district: data.district,
      address: data.address,
    };
    const payload = {
      name: data.name,
      birth: data.birth,
      gender: data.gender,
      address: address,
    };
    console.log(payload);
    const result = await actionAuth.updateInfoAsync(payload);
    // console.log("result", result);
    if (result) {
      notifySuccess("Cập nhật thành công !");
    } else notifyError("Cập nhật thất bại, vui lòng thử lại !");
  };

  const handleGetEmailOTP = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    if (email === "") {
      notifyError("Vui lòng nhập email");
      return;
    } else {
      const mess = await actionAuth.getOTPAsync({
        email_or_phone: email,
      });
      if (mess) {
        notifySuccess(mess);
        setEmailOTP(true);
      } else notifyError("Gửi mã OTP thất bại, vui lòng thử lại !");
    }
  };
  const handleGetPhoneOTP = async () => {
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const res = phoneRegex.test(phone);
    if (res) {
      if (phone[0] === "0") {
        const head = "+84";
        const number = phone.slice(1);
        phone = head.concat(number);
      }
    } else notifyError("Vui lòng nhập số điện thoại");

    if (phone === "") {
      notifyError("Vui lòng nhập số điện thoại");
      return;
    } else {
      const mess = await actionAuth.getOTPAsync({
        email_or_phone: phone,
      });
      if (mess) {
        notifySuccess(mess);
        setPhoneOTP(true);
      } else notifyError("Gửi mã OTP thất bại, vui lòng thử lại !");
    }
  };
  const handleChangeEmail = async () => {
    const emailotp = (document.getElementById("emailotp") as HTMLInputElement)
      .value;
    if (emailotp === "") {
      notifyError("Vui lòng nhập otp");
      return;
    } else {
      const mess = await actionAuth.getOTPAsync({
        email_or_phone: emailotp,
      });
      if (mess) {
        notifySuccess(mess);
        const info = await actionAuth.getUserAsync();
        closeModal();
        setEmailOTP(false);
      } else notifyError("Gửi mã OTP thất bại, vui lòng thử lại !");
    }
  };
  const handleChangePhone = async () => {
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    const code = (document.getElementById("phoneotp") as HTMLInputElement)
      .value;
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const res = phoneRegex.test(phone);
    if (res) {
      if (phone[0] === "0") {
        const head = "+84";
        const number = phone.slice(1);
        phone = head.concat(number);
      }
    }
    if (phone === "") {
      notifyError("Vui lòng nhập số điện thoại");
      return;
    } else {
      const mess = await actionAuth.changePhoneAsync({
        phone: phone,
        code: code,
      });
      if (mess) {
        notifySuccess("Thay đổi số điện thoại thành công");
        const info = await actionAuth.getUserAsync();
        setPhoneOTP(false);
      } else notifyError("Mã otp không đúng hoặc hết hạn, vui lòng thử lại !");
    }
  };
  const handleOnChange = () => {
    setEditState(false);
  };

  return (
    <div className="infomation" style={{ width: "500px" }}>
      <div className="card infomation-card">
        <div className="card-body">
          <div className="form-img">
            <Link to="/" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  AD
                </span>
                Store
              </h1>
            </Link>
          </div>
          <form onSubmit={handleSubmit(submit)} onChange={handleOnChange}>
            <div className="input-group input-email">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Email"
                defaultValue={
                  !authState.isLoggedIn
                    ? ""
                    : authState.data?.data?.email === ""
                    ? "Chưa có"
                    : authState.data?.data?.email
                }
                aria-describedby="basic-addon1"
                {...register("email")}
                required
              />
              <button
                className="btn btn-primary btn-get-otp"
                onClick={handleGetEmailOTP}
                type="button"
              >
                Nhận mã OTP
              </button>
            </div>
            {emailOTP && (
              <div className="input-group input-name">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  id="emailotp"
                  className="form-control"
                  placeholder="Email OTP"
                  aria-describedby="basic-addon1"
                  required
                />
                <button
                  className="btn btn-primary btn-get-otp"
                  onClick={handleChangeEmail}
                  type="button"
                >
                  Thay đổi email
                </button>
              </div>
            )}
            <div className="input-group input-password">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Phone"
                defaultValue={
                  !authState.isLoggedIn
                    ? ""
                    : authState.data?.data?.phone === "" ||
                      authState.data?.data?.phone === undefined
                    ? "Chưa có"
                    : formatPhone.concat(authState.data?.data?.phone?.slice(3))
                }
                aria-describedby="basic-addon1"
                {...register("phone")}
                required
              />
              <button
                className="btn btn-primary btn-get-otp"
                onClick={handleGetPhoneOTP}
                type="button"
              >
                Nhận mã OTP
              </button>
            </div>
            {phoneOTP && (
              <div className="input-group input-name">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  id="phoneotp"
                  className="form-control"
                  placeholder="Phone OTP"
                  aria-describedby="basic-addon1"
                  required
                />
                <button
                  className="btn btn-primary btn-get-otp"
                  onClick={handleChangePhone}
                  type="button"
                >
                  Thay đổi số điện thoại
                </button>
              </div>
            )}
            <div className="input-group input-name">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                defaultValue={
                  authState.isLoggedIn ? authState.data?.data?.name : ""
                }
                aria-describedby="basic-addon1"
                {...register("name")}
                required
              />
            </div>
            <div className="input-group input-name">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Giới tính"
                defaultValue={
                  authState.isLoggedIn ? authState.data?.data?.gender : ""
                }
                aria-describedby="basic-addon1"
                {...register("gender")}
                required
              />
            </div>
            <div className="input-group input-name">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                placeholder="Ngày sinh"
                defaultValue={
                  !authState.isLoggedIn
                    ? "date"
                    : authState.data?.data?.birth
                    ? new Date(authState.data?.data?.birth)
                        .toISOString()
                        .substring(0, 10)
                    : ""
                }
                aria-describedby="basic-addon1"
                {...register("birth")}
                required
              />
            </div>
            <div className="input-group input-address">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Tỉnh/Thành phố"
                defaultValue={
                  authState.isLoggedIn
                    ? authState.data?.data?.address?.province
                    : ""
                }
                aria-describedby="basic-addon1"
                {...register("province")}
                required
              />
              <input
                type="text"
                className="form-control"
                placeholder="Huyện/Quận"
                defaultValue={
                  authState.isLoggedIn
                    ? authState.data?.data?.address?.district
                    : ""
                }
                aria-describedby="basic-addon1"
                {...register("district")}
                required
              />
              <input
                type="text"
                className="form-control"
                placeholder="Địa chỉ"
                defaultValue={
                  authState.isLoggedIn
                    ? authState.data?.data?.address?.address
                    : ""
                }
                aria-describedby="basic-addon1"
                {...register("address")}
                required
              />
            </div>
            <div className="link-forgot">
              <a href="#" style={{ color: "#47c0d0 " }}>
                Change password
              </a>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-login"
              disabled={editState}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
