import React, { useState } from "react";
import { Link } from "react-router-dom";
import socialApi from "../../../api/social/socialApi";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import ModalInfo from "../../../Components/common/PersonalInfo/ModalInfo/personalInfo";
import useAuth from "../../../store/auth";
import useDiscount from "../../../store/discount";
import useFollow from "../../../store/social";
import { moneyFormater } from "../../../utils/moneyFormater";

import "./follower.scss";
import DiscountTable from "./FollowerTable";

const Follower = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [listFollower, actionFollower] = useFollow();
  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };

  React.useEffect(() => {
    (async () => {
      await actionFollower.GetListFollower({});
    })();
  }, []);
  console.log("res", listFollower);

  return (
    <div className="home">
      <div className="sidebar">
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
              <Link to="/sale" className="text-decoration-none">
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
                <div className="input-group"></div>
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
                  <a
                    onClick={openInfoModal}
                    className="menuProfile menuLinkHover"
                  >
                    Th??ng tin c?? nh??n
                  </a>
                  <Link to="/chat" className="menuProfile menuLinkHover">
                    Tin nh???n
                  </Link>
                  <div className="lineMenu"></div>
                  <a
                    href="/"
                    className="menuProfile menuLinkHover text-red-500 font-bold"
                    onClick={handleLogout}
                  >
                    ????ng xu???t
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="center flex">
          <div className="mb-5">
            <div className="row border-top pr">
              <div className="d-none d-lg-block" style={{ width: "175px" }}>
                <Link
                  to="/sale"
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-user i"></i>
                  <h6 className="m-0">????n h??ng</h6>
                </Link>

                <Link
                  to="/sale/follower"
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-user i"></i>
                  <h6 className="m-0">Ng?????i ????ng k??</h6>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="homeContainer">
              <DiscountTable />
            </div>
          </div>
        </div>

        <div className="bottom"></div>
      </div>
      <ContainerModal isVisible={showInfoModal} closeModal={closeInfoModal}>
        <ModalInfo closeModal={closeInfoModal} />
      </ContainerModal>
    </div>
  );
};

export default Follower;
