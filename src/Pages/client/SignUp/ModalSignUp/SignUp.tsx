import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../store/auth";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import "./style.css";

interface Props {
  closeModal: () => void;
  openSignInModal: () => void;
}

const ModalSignUp = (props: Props) => {
  const [, actionAuth] = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { closeModal, openSignInModal } = props;

  const handleOpenSignIn = () => {
    closeModal();
    openSignInModal();
  };

  const handleGetOTP = async () => {
    const emailSignUp = (document.getElementById("email") as HTMLInputElement)
      .value;

    if (emailSignUp === "") {
      handleSubmit(submit);
      return;
    } else {
      const mess = await actionAuth.getOTPAsync({
        email_or_phone: emailSignUp,
      });
      mess
        ? notifySuccess(mess)
        : notifyError("Gửi mã OTP thất bại, vui lòng thử lại !");
    }
  };

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const pass = (document.getElementById("pass") as HTMLInputElement).value;
    const confirmPass = (
      document.getElementById("confirm-pass") as HTMLInputElement
    ).value;
    if (pass === confirmPass) {
      const result = await actionAuth.signUpAsync(data);

      if (!result) notifyError("Sai tài khoản hoặc mật khẩu");
      else {
        reset();
        notifySuccess("Đăng ký thành công");
        closeModal();
        navigate("/");
      }
    } else {
      notifyError("Mật khẩu xác nhận không khớp, vui lòng nhập lại !");
    }
  };
  return (
    <div className="sign-up">
      <div className="card sign-up-card">
        <div className="sign-up-card-body">
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
                type="text"
                id="email"
                className="form-control"
                placeholder="Email"
                {...register("email_or_phone")}
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group input-password">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="OTP"
                aria-describedby="basic-addon1"
                {...register("code")}
                required
              />
              <button
                type="button"
                onClick={handleGetOTP}
                className="btn btn-primary btn-get-otp"
              >
                Get OTP
              </button>
            </div>
            <div className="input-group input-password">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                id="pass"
                type="password"
                className="form-control"
                placeholder="Password"
                aria-describedby="basic-addon1"
                {...register("password")}
                required
              />
            </div>
            <div className="input-group input-password">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                id="confirm-pass"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-login">
              Sign Up
            </button>
            <a
              onClick={handleOpenSignIn}
              className="btn btn-primary sign-up-btn-login btn-sign-up-by-email"
            >
              Sign in
              <i className="fa-solid fa-angle-left angle-left"></i>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalSignUp;
