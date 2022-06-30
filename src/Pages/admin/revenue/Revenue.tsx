import React from "react";
import { Link } from "react-router-dom";
import { ContainerModal } from "../../../Components/common/ContainerModal";
import ChangePass from "../../../Components/common/PersonalInfo/ChangePass/changepass";
import ModalInfo from "../../../Components/common/PersonalInfo/ModalInfo/personalInfo";
import Chart from "../../../Components/pages/admin/chart/Chart";
import Widget from "../../../Components/pages/admin/widget/Widget";
import useAuth from "../../../store/auth";

import "./style.scss";

const Revenue = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [showInfoModal, setInfoModal] = React.useState(false);
  const openInfoModal = () => setInfoModal(true);
  const closeInfoModal = () => setInfoModal(false);
  const [showChangePassModal, setChangePassModal] = React.useState(false);
  const openChangePassModal = () => setChangePassModal(true);
  const closeChangePassModal = () => setChangePassModal(false);
  const handleLogout = () => {
    actionAuth.logoutAsync();
  };

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
                  <a
                    onClick={openInfoModal}
                    className="menuProfile menuLinkHover"
                  >
                    Thông tin cá nhân
                  </a>
                  <Link
                    to={location.pathname}
                    className="menuProfile menuLinkHover !text-red-500 font-bold"
                    onClick={openChangePassModal}
                  >
                    Đổi mật khẩu
                  </Link>
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
        </div>
        <hr />
        <div className="center flex">
          <div className="mb-5">
            <div className="row border-top pr">
              <div className="d-none d-lg-block" style={{ width: "175px" }}>
                <Link
                  to="/admin/user"
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-user i"></i>
                  <h6 className="m-0">Người dùng</h6>
                </Link>
                <a
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  href="#navbar-vertical2"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-box i"></i>
                  <h6 className="m-0">Hàng hóa</h6>
                  <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav
                  className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                  id="navbar-vertical2"
                >
                  <div className="navbar-nav w-100 overflow-hidden">
                    <Link to="/admin/category" className="nav-item nav-link">
                      Loại hàng
                    </Link>
                    <Link to="/admin/product" className="nav-item nav-link">
                      Sản phẩm
                    </Link>
                    <Link to="/admin/discount" className="nav-item nav-link">
                      Khuyến mãi
                    </Link>
                  </div>
                </nav>
                <a
                  className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                  data-toggle="collapse"
                  href="#navbar-vertical3"
                  style={{
                    height: "65px",
                    marginTop: "-1px",
                  }}
                >
                  <i className="fa-solid fa-chart-line i"></i>
                  <h6 className="m-0">Thống kê</h6>
                  <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav
                  className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                  id="navbar-vertical3"
                >
                  <div
                    className="navbar-nav w-100 overflow-hidden"
                    // style={{ height: "410px" }}
                  >
                    <Link to="/admin/revenue" className="nav-item nav-link">
                      Doanh thu
                    </Link>
                    <Link to="/admin/bill" className="nav-item nav-link">
                      Đơn hàng
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="homeContainer">
              <div className="widgets">
                <Widget type="earning" />
                <Widget type="balance" />
              </div>
            </div>

            <div className="chart">
              <Chart title="Doanh thu" aspect={2 / 1} />
            </div>
          </div>
        </div>
        <div className="bottom"></div>
      </div>
      <ContainerModal isVisible={showInfoModal} closeModal={closeInfoModal}>
        <ModalInfo closeModal={closeInfoModal} />
      </ContainerModal>
      <ContainerModal
        isVisible={showChangePassModal}
        closeModal={closeChangePassModal}
      >
        <ChangePass closeModal={closeChangePassModal} />
      </ContainerModal>
    </div>
  );
};

export default Revenue;
