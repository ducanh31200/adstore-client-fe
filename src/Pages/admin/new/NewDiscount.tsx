import "./new.scss";
import style from "./style.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { notifyError, notifySuccess } from "../../../utils/notify";

import discountApi from "../../../api/discount/discountApi";
import useAuth from "../../../store/auth";
import { Link } from "react-router-dom";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import ModalInfo from "../../../Components/common/PersonalInfo/ModalInfo/personalInfo";
type Props = {
  inputs: any;
  title: any;
};

const NewDiscount = (props: Props) => {
  const inputs = props.inputs;
  const title = props.title;

  const { register, handleSubmit, reset } = useForm();
  const [stateAuth, actionAuth] = useAuth();
  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };
  const onSubmit = async (data: any) => {
    const payload = {
      code: data.code,
      enable: Boolean(data.enable),
      dateEnd: data.dateEnd,
      dateStart: data.dateStart,
      quantity: Number(data.quantity),
      minPrice: Number(data.minPrice),
      maxPrice: Number(data.maxPrice),
      is_percent: Boolean(data.is_percent),
      is_ship: Boolean(data.is_ship),
      is_oic: Boolean(data.is_oic),
      value: Number(data.value),
    };
    console.log(payload);

    const res = await discountApi.create(payload);
    console.log(res);
    if (res.status === 200) {
      notifySuccess("Thêm mã giảm giá thành công !");
      reset();
      window.location.reload();
    } else notifyError(res.response.data.msg);
  };

  return (
    <div className="container-fluid">
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark" href="">
              FAQs
            </a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="">
              Help
            </a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="">
              Support
            </a>
          </div>
        </div>

        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark px-2" href="">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="text-dark px-2" href="">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="text-dark px-2" href="">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="text-dark px-2" href="">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="text-dark pl-2" href="">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="row align-items-center px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <Link to="/admin" className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">
                AD
              </span>
              Store
            </h1>
          </Link>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form action="">
            <div className="input-group">
              <div className="input-group-append"></div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <div>
            <a href="" className="btn border">
              <i className="fas fa-heart text-primary"></i>
              <span className="badge">0</span>
            </a>
            <a href="" className="btn border">
              <i className="fas fa-shopping-cart text-primary"></i>
              <span className="badge">0</span>
            </a>
          </div>
        </div>
        <div
          className="wrap_menuAvatar"
          style={{ marginTop: "10px", marginLeft: "auto" }}
        >
          <i className="fa-solid fa-user " />
          &emsp;
          <span>
            {stateAuth.data.data?.name
              ? stateAuth.data.data.name
              : stateAuth.data.data?.email
              ? stateAuth.data.data.email.substring(
                  0,
                  stateAuth.data.data.email.lastIndexOf("@")
                )
              : stateAuth.data.data?.phone}
          </span>
          <div className="wrap_contentHover">
            <div className="contentHover py-[16px]">
              <a onClick={openInfoModal} className="menuProfile menuLinkHover">
                Thông tin cá nhân
              </a>
              <a className="menuProfile menuLinkHover">Tin nhắn</a>
              <div className="lineMenu"></div>
              <a
                href="/"
                className="menuProfile menuLinkHover text-red-500 font-bold"
                onClick={handleLogout}
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={handleSubmit(onSubmit)}>
                {inputs.map((input: any, index: number) => (
                  <div className="formInput" key={index}>
                    <label>{input.label}</label>
                    {input.type === "option" ? (
                      <div className="option">
                        <select {...register(`${input.key}`)}>
                          {/* <option>Chọn</option> */}
                          <option key="1" value="">
                            False
                          </option>
                          <option key="2" value="true">
                            True
                          </option>
                        </select>
                      </div>
                    ) : (
                      <input
                        {...register(`${input.key}`)}
                        type={input.type}
                        placeholder={input.label}
                        required
                      />
                    )}
                  </div>
                ))}

                <button style={{ height: "50px" }}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ContainerModal isVisible={showInfoModal} closeModal={closeInfoModal}>
        <ModalInfo closeModal={closeInfoModal} />
      </ContainerModal>
    </div>
  );
};

export default NewDiscount;
