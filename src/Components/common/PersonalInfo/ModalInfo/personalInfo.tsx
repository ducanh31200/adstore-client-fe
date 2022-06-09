import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../../../store/auth";

interface Props {
  closeModal: () => void;
}

const ModalInfo = (props: Props) => {
  const { closeModal } = props;
  const { register, handleSubmit, reset } = useForm();

  const [loginType, setloginType] = useState("password");
  const [editState, setEditState] = useState(true);
  const [authState, actionAuth] = useAuth();

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

  const handleGetValue = (e: any) => {
    const value = e.target.value;
    setloginType(value);
  };
  const handleOnChange = () => {
    setEditState(false);
  };

  return (
    <div className="infomation">
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
                className="form-control"
                placeholder="Email"
                value={authState.data.data.email}
                aria-describedby="basic-addon1"
                {...register("email")}
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
                placeholder="Name"
                value={authState.data.data.name}
                aria-describedby="basic-addon1"
                {...register("name")}
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
                placeholder="Phone"
                value={authState.data.data.phone}
                aria-describedby="basic-addon1"
                {...register("phone")}
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
                placeholder="Address"
                value={authState.data.data.address}
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
