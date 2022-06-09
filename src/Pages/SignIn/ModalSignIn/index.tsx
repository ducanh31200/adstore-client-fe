import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../../store/auth";
import { notifyError, notifySuccess } from "../../../utils/notify";
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
  const handleOpenSignUp = () => {
    closeModal();
    openSignUpModal();
  };
  const history = useHistory();

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const result = await actionAuth.loginAsync(data);
    // console.log("result", result);
    if (result) {
      reset();
      closeModal();
      history.push("/");
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
                  defaultChecked
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
