import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../../../store/auth";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.css";

interface Props {
  closeModal: () => void;
  openSignUpModal: () => void;
}

const ModalSignIn = (props: Props) => {
  const { closeModal, openSignUpModal } = props;
  const [authState, actionAuth] = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [loginType, setloginType] = useState("password");
  const navigate = useNavigate();
  const handleOpenSignUp = () => {
    closeModal();
    openSignUpModal();
  };

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const res = phoneRegex.test(data.email_or_phone);
    if (res) {
      if (data.email_or_phone[0] === "0") {
        const head = "+84";
        const number = data.email_or_phone.slice(1);
        data.email_or_phone = head.concat(number);
      }
    }
    let result = undefined;
    if (loginType === "password") {
      result = await actionAuth.loginAsync({
        email_or_phone: data.email_or_phone,
        password: data.password,
      });
    } else {
      result = await actionAuth.loginAsync({
        email_or_phone: data.email_or_phone,
        code: data.code,
      });
    }

    if (result) {
      console.log("res", result);
      if (result?.data?.role === "Admin") navigate("/admin");
      else if (result?.data?.role === "Sale") navigate("/sale");
      else navigate("/");
      reset();
      closeModal();
    }
  };
  const handleGetOTP = async () => {
    const email_phone = (
      document.getElementById("email-or-phone") as HTMLInputElement
    ).value;

    if (email_phone === "") {
      handleSubmit(submit);
      return;
    } else {
      const mess = await actionAuth.getOTPAsync({
        email_or_phone: email_phone,
      });
      mess
        ? notifySuccess(mess)
        : notifyError("Gửi mã OTP thất bại, vui lòng thử lại !");
    }
  };
  const handleGetValue = (e: any) => {
    const value = e.target.value;
    setloginType(value);
  };

  return (
    <div className="login">
      <div className="card login-card">
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
          <form onSubmit={handleSubmit(submit)}>
            <div className="input-group input-email">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                id="email-or-phone"
                type="text"
                className="form-control"
                placeholder="Email/Phone"
                aria-describedby="basic-addon1"
                {...register("email_or_phone")}
                required
              />
            </div>
            <div className="input-group input-password">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              {loginType === "password" ? (
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-describedby="basic-addon1"
                  {...register("password")}
                  required
                />
              ) : (
                <>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    aria-describedby="basic-addon1"
                    {...register("code")}
                    required
                  />
                  <a
                    className="btn btn-primary btn-get-otp"
                    onClick={handleGetOTP}
                  >
                    Get OTP
                  </a>
                </>
              )}
            </div>
            <div className="radio-password-sign-in">
              <label>
                <input
                  type="radio"
                  id="type_pass"
                  name="type"
                  value="password"
                  defaultChecked={loginType === "password"}
                  onChange={handleGetValue}
                />{" "}
                Password
              </label>

              <label>
                <input
                  type="radio"
                  id="type_otp"
                  name="type"
                  value="otp"
                  onChange={handleGetValue}
                  defaultChecked={loginType !== "password"}
                />{" "}
                OTP
              </label>
            </div>
            <div className="link-forgot">
              <a href="#" style={{ color: "#47c0d0 " }}>
                Forgot password
              </a>
            </div>
            <button type="submit" className="btn btn-primary btn-login">
              Login
            </button>
            <div className="login-social">
              <span>or login by:</span>
              <div className="social-list">
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fab fa-google"></i>
                </a>
              </div>
            </div>
            <a
              onClick={handleOpenSignUp}
              className="btn btn-primary btn-sign-up btn-sign-up"
            >
              Sign up
              <i className="fa-solid fa-angle-right angle-right"></i>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalSignIn;
