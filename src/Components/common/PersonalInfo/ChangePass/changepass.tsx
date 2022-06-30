import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../../store/auth";
import { notifyError, notifySuccess } from "../../../../utils/notify";

interface Props {
  closeModal: () => void;
}

const ChangePass = (props: Props) => {
  const { closeModal } = props;
  const { register, handleSubmit } = useForm();
  const [editState, setEditState] = useState(true);
  const [authState, actionAuth] = useAuth();

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    if (data.password !== data.confirm_password) {
      notifyError("Mật khẩu mới không trùng khớp !");
    } else if (data.password === data.old_password)
      notifyError("Mật khẩu mới trùng với mật khẩu cũ !");
    else {
      const payload = {
        old_password: data.old_password,
        password: data.password,
      };

      const result = await actionAuth.changePassAsync(payload);
      // console.log("result", result);
      if (result) {
        notifySuccess("Đổi mật khẩu thành công !");
      } else notifyError("Đổi mật khẩu thất bại, vui lòng thử lại !");
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
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Old password"
                aria-describedby="basic-addon1"
                {...register("old_password")}
                required
              />
            </div>
            <div className="input-group input-name">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="New password"
                aria-describedby="basic-addon1"
                {...register("password")}
                required
              />
            </div>
            <div className="input-group input-name">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-unlock-alt"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                aria-describedby="basic-addon1"
                {...register("confirm_password")}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-login"
              disabled={editState}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
